
import CircularProgress from '@mui/material/CircularProgress';


const Spinner = ({color}:{color?:string}) => {
  return (
    
      <CircularProgress size={"1.2rem"} sx={{color:color}} />
   
  )
}

export default Spinner