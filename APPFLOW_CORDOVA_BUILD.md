# Clicaid Прозакон — сборка iOS в Ionic Appflow (Cordova)

**Использовать существующее приложение `clicaid` типа Cordova.**

- Репозиторий: `mkden/clicaid-app`
- Ветка: **`main`**
- Cordova iOS: `8.1.1`
- Версия: `1.9.11`
- Bundle ID: `mk.clicaid.app`
- Сборка: **iOS → App Store**; стек **macOS 2026.04 / Xcode 26.3**
- Сертификат и provisioning profile: прежняя настройка `ios` для команды `F2BCHMBHU9`

**Не выбирать `capacitor-ios-testflight`.** Это отдельная экспериментальная ветка. В существующем Appflow проект настроен на Cordova; сборка ветки Capacitor здесь завершится ошибкой `Current working directory is not a Cordova-based project`.

При создании новой сборки сначала можно в поле поиска **Search by hash, message, or branch** ввести **`main`** и выбрать самый свежий коммит из этой ветки. При необходимости обновить вкладку Appflow, чтобы подтянуть новые коммиты из GitHub.

Последние исправления исходной Cordova-сборки нормализуют права файлов `PEPhotoCropEditor.bundle`, обновляют Fastlane для iOS и контролируют `arm64`. Успешный архив GitHub Actions не гарантирует прохождения Apple Transporter: ошибка `ITMS-90085` требует проверки после реальной загрузки IPA.

Приватные сертификаты, ключи и пароли нельзя помещать в коммиты.
