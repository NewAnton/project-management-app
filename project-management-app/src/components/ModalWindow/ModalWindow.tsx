import { ReactPortal } from 'components/ReactPortal/ReactPortal';
import React from 'react';

interface ModalWindowInterface {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

export function ModalWindow({ children, isOpen, handleClose }: ModalWindowInterface) {
  // useEffect(() => {
  //   const closeOnEscapeKey = (event: KeyboardEvent) => {
  //     event.key === 'Escape' ? handleClose() : null;
  //   };
  //   document.body.addEventListener('keydown', closeOnEscapeKey);
  //   return () => {
  //     document.body.removeEventListener('keydown', closeOnEscapeKey);
  //   };
  // }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="portal-root">
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}
      <div
        className={'modal fade ' + (isOpen && 'show')}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
