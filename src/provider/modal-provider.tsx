import AlertModal from '@/components/modal/alert-modal';
import ProjectEditorModal from '@/components/modal/project-editor-modal';
import SignUpModal from '@/components/modal/sign-up-modal';
import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  return (
    <React.Fragment>
      {createPortal(
        <React.Fragment>
          <AlertModal />
          <SignUpModal />
          <ProjectEditorModal />
        </React.Fragment>,
        document.getElementById('modal-root')!
      )}
      {children}
    </React.Fragment>
  );
}
