import {useDispatch, useSelector} from "react-redux";
import {useGetMovieQuery} from "../../../features/api/apiSlice";
import {getMovie} from "../../../redux/slice/movieSlice";
import {useEffect, useState} from "react";
import LeftSideMenu from "../list/LeftSideMenu";
import {Grid} from "@mui/joy";
import Box from "@mui/joy/Box";


const LeftSide = () => {

    return (
        <div>
            <Box style={{ width : { xs: 0 ,sm: 0 , md: '17%' }, height : '100vh', position : 'fixed' }}>
                <LeftSideMenu/>
            </Box>
        </div>
    )

}

export default LeftSide