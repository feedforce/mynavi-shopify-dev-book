import React, { useEffect, useMemo } from "react";
import { Card, Form, FormLayout, Page, TextField } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useField, useForm } from "@shopify/react-form";
import { ContextualSaveBar } from "@shopify/app-bridge/actions";

const useContextualSaveBar = ({ reset, submit, dirty }) => {
  const app = useAppBridge();
  // 初期化
  const contextualSaveBar = useMemo(
    () =>
      ContextualSaveBar.create(app, {
        saveAction: {
          disabled: false,
          loading: false,
        },
        discardAction: {
          disabled: false,
          loading: false,
          discardConfirmationModal: true,
        },
      }),
    [app]
  );

  useEffect(() => {
    // 「破棄する」「保存する」がクリックされた際に実行する Callback 関数を登録する
    contextualSaveBar.subscribe(ContextualSaveBar.Action.DISCARD, reset);
    contextualSaveBar.subscribe(ContextualSaveBar.Action.SAVE, submit);
    return () => {
      // クリーンアップ関数の実行時に登録した Callback 関数を破棄する
      contextualSaveBar.unsubscribe();
    };
  }, [contextualSaveBar, reset, submit]);

  useEffect(() => {
    // フォームに変更があった場合のみ「保存されていない変更」を表示する
    contextualSaveBar.dispatch(
      dirty ? ContextualSaveBar.Action.SHOW : ContextualSaveBar.Action.HIDE
    );
  }, [contextualSaveBar, dirty]);
};

const MyForm: React.FC = () => {
  const { fields, reset, submit, dirty } = useForm({
    fields: {
      title: useField(""),
    },
    onSubmit: async (fieldValues) => {
      console.log(fieldValues);
      return { status: "success" };
    },
  });
  useContextualSaveBar({ reset, submit, dirty });

  return (
    <Page>
      <Card title="Sample form" sectioned>
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField label="Title" autoComplete="off" {...fields.title} />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
};

export default MyForm;
