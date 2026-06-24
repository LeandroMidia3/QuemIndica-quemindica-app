This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

npm run android dev

# referencia
https://www.youtube.com/watch?v=V3PUGubaSQo&list=PLnex8IkmReXwCyR-cGkyy8tCVAW7fGZow&index=2

# ver os logs
Dentro da pasta .android rodar:     npx react-native log-android

# icones
--icones
https://oblador.github.io/react-native-vector-icons/?utm_source=copilot.com
--icones
https://oblador.github.io/react-native-vector-icons/?utm_source=copilot.com#FontAwesome
https://www.flaticon.com/free-icon/growth_4185383?related_id=4185383&origin=pack

# redimensionar imagem
https://www.resizepixel.com/edit

# rodar o projeto API junto com o app localmente
adb -s ZF524WXRF5 reverse tcp:3000 tcp:3000

# gerar icones para o app
https://icon.kitchen/
https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher

# gerando apk para teste
cd C:\Particular\Projetos\ProjetoQuemIndica\App\android
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
./gradlew assembleRelease
