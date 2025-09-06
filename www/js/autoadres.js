// DaData API ключ (получите бесплатный на https://dadata.ru/)
const DADATA_API_KEY = "0f0b26f9be6377b19e8f9fa5c464e7bcd8663354";
const DADATA_SECRET = "4f8444ae8dddf933e314ed310fe59a2b0d0065a5";

var country_val = 'Россия';
var region_val = '';
var city_val = '';
var dom_val = '';
var street_val = '';
var city_list = [];
var street_list = [];
var dom_list = [];

// Функция для поиска через DaData
function dadataSearch(query, type, callback) {
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    
    const body = {
        query: query,
        count: 10,
        locations: [{ country: 'Россия' }],
        restrict_value: true
    };

    // Добавляем фильтрацию по типу в зависимости от того, что ищем
    if (type === 'city') {
        body.from_bound = { value: "city" };
        body.to_bound = { value: "city" };
    } else if (type === 'street') {
        body.from_bound = { value: "street" };
        body.to_bound = { value: "street" };
        // Добавляем город в ограничения, если он известен
        if (city_val) {
            body.locations.push({ city: city_val });
        }
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token ' + DADATA_API_KEY,
            'X-Secret': DADATA_SECRET
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if (data.suggestions) {
            callback(data.suggestions);
        } else {
            callback([]);
        }
    })
    .catch(error => {
        console.error('Ошибка DaData:', error);
        callback([]);
    });
}

// Функция для обратного геокодирования
function dadataReverseGeocode(lat, lng, callback) {
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token ' + DADATA_API_KEY,
            'X-Secret': DADATA_SECRET
        },
        body: JSON.stringify({
            lat: lat,
            lon: lng,
            radius_meters: 100,
            count: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.suggestions && data.suggestions.length > 0) {
            callback(data.suggestions[0]);
        } else {
            callback(null);
        }
    })
    .catch(error => {
        console.error('Ошибка обратного геокодирования:', error);
        callback(null);
    });
}

// Поиск городов
$('#city').keyup(function(){
    city_val = $('#city').val();
    if (city_val.length < 2) return;
    
    dadataSearch(city_val, 'city', function(suggestions) {
        city_list = suggestions.map(suggestion => suggestion.value);
        
        $("#city").autocomplete({
            source: city_list,
            focus: function(event, ui) {
                $("#city").val(ui.item.value);
                return false;
            },
            select: function(event, ui) {
                $("#city").val(ui.item.value);
                city_val = ui.item.value;
                
                // Получаем координаты выбранного города
                const selectedSuggestion = suggestions.find(s => s.value === ui.item.value);
                if (selectedSuggestion && selectedSuggestion.data.geo_lat && selectedSuggestion.data.geo_lon) {
                    const lat = selectedSuggestion.data.geo_lat;
                    const lng = selectedSuggestion.data.geo_lon;
                    const latlng = lat + ',' + lng;
                    $('#acord').val(latlng);
                }
                return false;
            }
        });
    });
});

// Поиск улиц
$('#street').keyup(function(){
    street_val = $('#street').val();
    if (street_val.length < 2 || !city_val) return;
    
    const query = city_val + ' ' + street_val;
    
    dadataSearch(query, 'street', function(suggestions) {
        street_list = suggestions.map(suggestion => {
            // Убираем название города из результата
            let streetName = suggestion.value;
            if (streetName.includes(city_val)) {
                streetName = streetName.replace(city_val, '').replace(',', '').trim();
            }
            return {
                label: streetName,
                value: suggestion.value,
                data: suggestion.data
            };
        });
        
        $("#street").autocomplete({
            source: street_list,
            focus: function(event, ui) {
                $("#street").val(ui.item.label);
                return false;
            },
            select: function(event, ui) {
                $("#street").val(ui.item.label);
                street_val = ui.item.label;
                
                // Получаем координаты выбранной улицы
                if (ui.item.data && ui.item.data.geo_lat && ui.item.data.geo_lon) {
                    const lat = ui.item.data.geo_lat;
                    const lng = ui.item.data.geo_lon;
                    const latlng = lat + ',' + lng;
                    $('#acord').val(latlng);
                }
                return false;
            }
        });
    });
});

// Поиск дома
$('#dom').keyup(function(){
    dom_val = $('#dom').val();
    if (dom_val.length === 0 || !city_val || !street_val) return;
    
    const fullAddress = city_val + ', ' + street_val + ', ' + dom_val;
    
    dadataSearch(fullAddress, 'address', function(suggestions) {
        if (suggestions.length > 0) {
            const bestMatch = suggestions[0];
            if (bestMatch.data && bestMatch.data.geo_lat && bestMatch.data.geo_lon) {
                const lat = bestMatch.data.geo_lat;
                const lng = bestMatch.data.geo_lon;
                const latlng = lat + ',' + lng;
                $('#acord').val(latlng);
                
                // Автозаполняем поля если нашли точный адрес
                if (bestMatch.data.house) {
                    $("#dom").val(bestMatch.data.house);
                }
            }
        }
    });
});

// Дополнительная функция для получения координат по полному адресу
function getCoordinatesFromFullAddress() {
    const city = $("#city").val();
    const street = $("#street").val();
    const dom = $("#dom").val();
    
    if (!city || !street || !dom) return;
    
    const fullAddress = city + ', ' + street + ', ' + dom;
    
    dadataSearch(fullAddress, 'address', function(suggestions) {
        if (suggestions.length > 0) {
            const bestMatch = suggestions[0];
            if (bestMatch.data && bestMatch.data.geo_lat && bestMatch.data.geo_lon) {
                const lat = bestMatch.data.geo_lat;
                const lng = bestMatch.data.geo_lon;
                const latlng = lat + ',' + lng;
                $('#acord').val(latlng);
            }
        }
    });
}

// Вызываем при изменении любого поля
$('#city, #street, #dom').change(function(){
    setTimeout(getCoordinatesFromFullAddress, 500);
});

// Стили для autocomplete
const autocompleteStyles = `
.ui-autocomplete {
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.ui-menu-item {
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
}
.ui-menu-item:hover {
    background-color: #f5f5f5;
}
.ui-state-focus {
    background-color: #e3f2fd !important;
}
`;

// Добавляем стили
const style = document.createElement('style');
style.textContent = autocompleteStyles;
document.head.appendChild(style);