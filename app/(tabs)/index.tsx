import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { editorHtml } from "../../editor-web/build/editorHtml";
import {
  EditorBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useBridgeState,
  useEditorBridge,
} from "@10play/tentap-editor";
import { CounterBridge } from "@/components/CounterBridge";

const Counter = ({ editor }: { editor: EditorBridge }) => {
  const state = useBridgeState(editor);
  return (
    <View>
      <Text>
        {state.wordCount} || {state.characterCount}
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const editor = useEditorBridge({
    customSource: editorHtml,
    bridgeExtensions: [...TenTapStartKit, CounterBridge],
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: `<p>This is a basic example of implementing images.</p><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" /><p>s sdfdsf fd dsfd ssdfd dsfdsfdsfdsfd</p>`,
  });

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Counter editor={editor} />
        <TextInput placeholder="Title" style={exampleStyles.input} />
        <RichText editor={editor} scrollEnabled={false} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={exampleStyles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
