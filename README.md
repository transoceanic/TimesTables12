# MultiplicationTable-Client

language's fonts:
english
french
danish
dutch (english)
finnish
-- greek
-- japanese
-- korean
spanish
norwegian
-- russian
-- chinese
swedish
-- thai
-- turkish




Build for iOS
  Title: MultiplicationTable-Client



Build for Android
  Title: MultiplicationTableClient

myProject/AndroidManifest
<uses-sdk android:targetSdkVersion="26" android:minSdkVersion="14"
    tools:overrideLibrary="com.google.android.gms" />
gps/AndroidManifect
<uses-sdk android:minSdkVersion="14" tools:overrideLibrary="com.google.android.gms"/>

app/build.gradle
compileSdkVersion 26
buildToolsVersion "26.0.1"
defaultConfig {
    applicationId "org.cocos2d.helloworld"
    minSdkVersion 14
...
afterEvaluate {
    tasks.findByName('externalNativeBuildDebug')?.doLast {
        println ('Copying debug .so')
        copySo()
    }

    tasks.findByName('externalNativeBuildRelease')?.doLast {
        println ('Copying release .so')
        copySo()
    }
}

buildTypes {
    release {
        lintOptions {
            disable 'MissingTranslation'
        }
    }
}


find all minSdkVersion and replace to 14

find and replace to 26 26.0.1 (according to sdk version)
 android {
    4      compileSdkVersion 22
    5:     buildToolsVersion "22.0.1"
