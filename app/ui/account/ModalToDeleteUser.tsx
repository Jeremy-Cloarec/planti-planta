import ButtonDeleteUser from "../buttons/ButtonDeleteUser";
import styles from "./modal-delete.module.css"

export default function ModalToDeleteUser () {
    return (
        <div popover="auto" id="modalToDeleteUser" className={styles.popoverOpen}>
            <div className="bg-white p-3 m-3 flex flex-col gap-5 rounded-xs">
                <p>Etes vous sur de vouloir supprimer votre compte ?</p>
                <div className="flex gap-3 justify-between">
                    <button 
                        className="px-4 py-2 transition delay-75 duration-300 ease-in-out w-full bg-slate-200 hover:bg-slate-300" 
                        popoverTarget="modalToDeleteUser"
                    >
                        Annuler
                    </button>
                    <ButtonDeleteUser />
                </div>
            </div>
        </div>
    )
}