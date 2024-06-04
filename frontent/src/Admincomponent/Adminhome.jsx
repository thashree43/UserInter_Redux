import {Container,Card, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux"


const Adminhome = ()=>{

    const {adminInfo} = useSelector((state)=>state.admin)

    return (
        <div className="py-5">
            <Container>
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-45 bg-yellow-200 ">
        <div>
            <h1>{adminInfo.name}</h1>
            <p></p>
            <Button >GO TO DASHBOARD</Button>
        </div>
        </Card>
            </Container>

        </div>
    )
}

export default Adminhome