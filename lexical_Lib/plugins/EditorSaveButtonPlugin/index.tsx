import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import UnlinkButton from "@component/ModifyButton";
import React from "react";
import { toast } from "react-toastify";

type TProps = {
  setHtmlString: React.Dispatch<React.SetStateAction<string>>;
  useFor: string;
};

function EditorSaveButtonPlugin({ setHtmlString, useFor }: TProps) {
  const [editor] = useLexicalComposerContext();

  const handleSaveLetter = async () => {
    editor.update(() => {
      const hmtlString = $generateHtmlFromNodes(editor, null);
      setHtmlString(hmtlString);
      if (useFor === "about") toast.info("Changed your bio successfull!");
    });
  };

  return (
    <>
      <UnlinkButton
        textContent={"Save"}
        icon={""}
        iconPosition={"left"}
        backgroundColor={"bg-blue-700"}
        method={() => handleSaveLetter()}
        tailwind={"text-white mt-[20px]"}
      ></UnlinkButton>
    </>
  );
}

export default EditorSaveButtonPlugin;
