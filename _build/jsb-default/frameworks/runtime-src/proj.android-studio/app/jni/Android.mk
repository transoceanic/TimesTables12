LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

ifeq ($(USE_ARM_MODE),1)
LOCAL_ARM_MODE := arm
endif

LOCAL_SRC_FILES := hellojavascript/main.cpp \
../../../Classes/AppDelegate.cpp \
../../../Classes/PluginAdMobJS.cpp \
../../../Classes/PluginAdMobJSHelper.cpp \
../../../Classes/SDKBoxJSHelper.cpp
ifeq ($(USE_ANY_SDK),1)
LOCAL_SRC_FILES += ../../../Classes/SDKManager.cpp ../../../Classes/jsb_anysdk_basic_conversions.cpp ../../../Classes/manualanysdkbindings.cpp ../../../Classes/jsb_anysdk_protocols_auto.cpp
endif

LOCAL_CPPFLAGS := -DSDKBOX_ENABLED \
-DSDKBOX_COCOS_CREATOR
LOCAL_LDLIBS := -landroid \
-llog
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../../Classes

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic \
PluginAdMob \
sdkbox

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 \
-DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)
$(call import-add-path,$(LOCAL_PATH))


$(call import-module, scripting/js-bindings/proj.android)
$(call import-module, ./sdkbox)
$(call import-module, ./pluginadmob)
