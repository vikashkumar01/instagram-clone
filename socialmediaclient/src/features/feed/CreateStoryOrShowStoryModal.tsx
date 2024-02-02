import { Modal } from "@mui/material"

const CreateStoryOrShowStoryModal = ({
    createStoryOrShowStoryModal,
    createStoryModalHandler,
    showStoryModalHandler,
    createStoryOrShowStoryModalHandler,
    setUserId,
    userId
}: {
    createStoryOrShowStoryModal: boolean,
    createStoryModalHandler: () => void,
    showStoryModalHandler: () => void,
    createStoryOrShowStoryModalHandler: () => void,
    setUserId: (userId:string) => void,
    userId:string
}) => {
    return (
        <Modal
            open={createStoryOrShowStoryModal}
        >
            <div className='create-story-or-show-story'>
                <button onClick={createStoryModalHandler}>Create Story</button>
                <button onClick={() => { showStoryModalHandler(); setUserId(userId)}}>View Story</button>
                <button onClick={createStoryOrShowStoryModalHandler}>Cancel</button>
            </div>
        </Modal>
    )
}

export default CreateStoryOrShowStoryModal