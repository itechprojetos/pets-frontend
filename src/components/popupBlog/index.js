import React from 'react'

import { Modal } from 'react-bootstrap'

function ExcluirPopUP({ handleClose, show, deletePost }) {

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tem certeza que deseja excluir ?</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        Se você tem certeza clique em excluir esteja ciente que
                        não tem como recuperar o dados que foram excluidos.
                    </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-dark" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onMouseDown={deletePost}
                        onMouseUp={handleClose}
                    >
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ExcluirPopUP
