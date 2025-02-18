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
    dynamicHeight: true,
    initialContent: `<p>This is a basic example of implementing images.</p><img src="https://images.unsplash.com/photo-1498747946579-bde604cb8f44?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /><p>s sdfdsf fd dsfd ssdfd dsfdsfdsfdsfd</p>`,
  });

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <ScrollView contentContainerStyle={exampleStyles.scrollView}>
        <Counter editor={editor} />
        <View style={{ marginVertical: 20 }}>
          <Text style={exampleStyles.title}>Editor</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero.
          </Text>
        </View>
        <TextInput placeholder="Subtitle" style={exampleStyles.input} />
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
  scrollView: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
