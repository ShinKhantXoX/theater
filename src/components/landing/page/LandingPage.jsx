import LeftSide from "../entry/LeftSide";
import RightSide from "../entry/RightSide";
import {Grid} from "@mui/joy";


const LandingPage = () => {

    return(
        <>
            <Grid container sx={{ width: { xs: '100%',sm: '820px',md: '100%' } ,flexGrow: 0}} spacing={2}>
                {/*<Grid item sx={{ display: { xs : 'none', sm: 'block', md: 'block' } }} md={1}>*/}
                {/*    <LeftSide />*/}
                {/*</Grid>*/}
                <Grid item sx={{ width: { xs: '100%',sm: '820px',md: '100%' } ,p: { xs : 0 }, m: { xs:0 } ,overflowX: 'hidden' }} xs={12} sm={12} md={12}>
                    <RightSide />
                </Grid>
            </Grid>
        </>
    )

}

export default LandingPage;