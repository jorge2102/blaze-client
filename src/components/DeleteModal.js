import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const DeleteModal = ({ idItem, nameItem, show, close, deleteItem }) => {
    const styles = useStyles();

    const confirm = () => {
        deleteItem(idItem);
    };

    return (
        <>
            <Modal open={show} onClose={close}>
                <div className={styles.modal}>
                    <p>Are you sure you want to delete <b>{nameItem}</b>? </p>
                    <div align="right">
                        <Button color="secondary" onClick={confirm} >Yes</Button>
                        <Button onClick={close}>No</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default DeleteModal;