import { CiCamera } from "react-icons/ci";

const EmptyPost = ({name,isReels}:{name:string,isReels?:boolean}) => {
  return (
    <div className="empty-post" style={isReels?{marginTop:"-2rem"}:undefined}>
      <button>
         <CiCamera size={100} color={"grey"}/>
         <h1>{name}</h1>
         <h4>When you {name}, they will appear on your profile.</h4>
      </button>
    </div>
  )
}

export default EmptyPost