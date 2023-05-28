import MovieCard from "../../globalComponent/MovieCard";
import {Autocomplete,
    Button,
    Grid, Input} from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/joy/Typography";
import {useEffect, useState} from "react";
import {useGetMovieQuery, useGetSearchMovieQuery} from "../../../features/api/apiSlice";
import Radio, { radioClasses } from '@mui/joy/Radio';
import {useDispatch, useSelector} from "react-redux";
import {getMovie} from "../../../redux/slice/movieSlice";
import { Icon, Pagination } from 'semantic-ui-react';
import Box from "@mui/joy/Box";
import YouTube from 'react-youtube';
import AspectRatio from "@mui/joy/AspectRatio";
import {imageBaseUrl} from "../../../utilities/endpoints";
import StarRatingComponent from "react-star-rating-component";
import {TiStarFullOutline} from "react-icons/ti";
import {FcCamcorderPro, FcComboChart} from "react-icons/fc";


const RightSide = () => {

    const sort = ['all','movie','tv','person'];

    const [cat,setCat] = useState('')
    const [dayAndWeek,setDayAndWeek] = useState('day');
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const [secCondi,setSecCondi] = useState(true);

    const dispatch = useDispatch();

    const {data : searchData} = useGetSearchMovieQuery({
        apiKey: "bc6c556b600e6ef3a30b3547bdcc0174",
        query: search
    }, { skip : secCondi });

    const { data,isError,isLoading,isFetching } = useGetMovieQuery({
        cat : cat ? cat : 'all',
        dayAndWeek : dayAndWeek ? dayAndWeek : 'day',
        apiKey : 'bc6c556b600e6ef3a30b3547bdcc0174',
        page : page ? page : 1
    });



    const movieTrailer = useSelector((state) => state.movieTrailerReducer);

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    };

    const detail = useSelector(state => state.movieDetailReducer);

    const searchHandler = (e) => {
        if(e.key === "Enter"){
            {
                setSearch(e.target.value),
                    setSecCondi(false)
            }
        }
    }


    useEffect(() => {
        if(search || searchData) {
            dispatch(getMovie(searchData))
        }

    }, [searchData,search]);

    useEffect(() => {
        if(cat || data){
            dispatch(getMovie(data))
        }
    }, [cat,data])


    return (
        <Box sx={{ width: { xs: '375px',sm: '820px',md: '100%' }, mx:{ xs:'0px' }, mt: { xs: '20px', sm: 0, md: 0 } ,overflowX:"hidden" }}>
                <Grid
                    container
                    sx={{ width: { xs: '375px',sm: '820px',md: '100%' } ,marginX: { xs: 0,sm: 0 }, marginY : {xs: '0px' ,sm: '0px' ,md: '15px' }, padding: { xs: 0,sm:0 } , overflowX: 'hidden' }}
                    spacing={{ xs:0,sm:0,md:2 }}
                    rowSpacing={0}
                    columnSpacing={0}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={12} md={12} sx={{ display: { xs: 'block',sm: 'block' ,md: 'flex' }, justifyContent: { md:"space-between" }, alignItems:'center', paddingLeft: { xs: '10px' }, my: { xs: '20px', sm: '20px' , md: 0 } }}>
                        <Typography level="h1" fontSize="md" sx={{ mb: { xs : 0, sm : 0.5 }, paddingX: { xs : '20px' } ,color: (theme) => theme.vars.palette.primary }}>Trending</Typography>
                        <Box sx={{ paddingX: { xs : '20px' } }} >
                            <Box sx={{ display : { xs: 'block',sm: 'block' ,md : 'flex' }, justifyContent : { md: 'flex-end' }, alignItems : 'center',gap: 1.5 }}>
                                <Box sx={{ display : { xs: 'block',sm: 'flex' ,md : 'flex' }, justifyContent : { sm: 'flex-start' ,md: 'space-between' }, alignItems : 'center',gap: 1.5 }}>
                                    <Input
                                        // startDecorator={search?.length === 0 && (<CgSearch />)}
                                        placeholder={'Search ...'}
                                        defvalue={search ? search : ''}
                                        sx={{ width:{ xs: '250px' }, marginY: { xs: '20px' } }}
                                        value={search ? search : ''}
                                        onChange={(e) => {
                                            setSearch(e.target.value),
                                                setSecCondi(false)
                                        }
                                        }
                                        onKeyPress={(e) => searchHandler(e)}
                                        endDecorator={<Button sx={{bgcolor: (theme) => theme.vars.palette.whiteSmoke, color: (theme) => theme.vars.palette.textGray}}
                                                              onClick={(e) => {
                                                                  setSearch(''),setSecCondi(true)
                                                              }}><CloseIcon/></Button>}
                                    />
                                    <Radio
                                        sx={{ color: (theme) => theme.vars.palette.primary, marginRight: { xs: '20px', sm:0, md:0 }  }}
                                        checked={dayAndWeek === 'day'}
                                        onChange={(e) => setDayAndWeek(e.target.value)}
                                        value="day"
                                        name="radio-buttons"
                                        slotProps={{ input: { 'aria-label': 'Day' } }}
                                        label={'Day'}
                                    />
                                    <Radio
                                        sx={{ color: (theme) => theme.vars.palette.primary  }}
                                        checked={dayAndWeek === 'week'}
                                        onChange={(e) => setDayAndWeek(e.target.value)}
                                        value="week"
                                        name="radio-buttons"
                                        slotProps={{ input: { 'aria-label': 'B' } }}
                                        label={'Week'}
                                    />
                                </Box>
                                <Autocomplete
                                    placeholder="Sort by:"
                                    options={sort}
                                    sx={{ width: 150, marginX : { sm: 0 ,md: '40px' }, marginTop: { xs: '20px', md: 0 } }}
                                    onChange={e => setCat(e.target.innerText)}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ width: { xs: 'auto' }, display: { xs: movieTrailer?.key?.length === 0 ? 'none' : 'block', sm : movieTrailer?.key?.length === 0 ? 'none' : 'block', md: movieTrailer?.key?.length === 0 ? 'none' : 'flex' } ,flexGrow: 1,marginY: '10px', paddingY: 0 }}>
                    <Grid xs={12} sm={12} md={6} sx={{ display: { xs: movieTrailer?.key?.length === 0 ? 'none' : 'block', sm : movieTrailer?.key?.length === 0 ? 'none' : 'block', md: movieTrailer?.key?.length === 0 ? 'none' : 'flex' } }}>
                        <Box sx={{ width: { xs: '375px' ,sm: '100%' } ,display: movieTrailer?.key?.length === 0 ? 'none' : 'block', padding: { xs: '20px' ,md: '20x' }, marginLeft: { xs: '0px' } }}>
                            {movieTrailer?.key?.length > 0 && <YouTube videoId={movieTrailer?.key} style={{ borderRadius: '20px' }} opts={opts}/>}
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} sx={{ display: movieTrailer?.key?.length === 0 ? 'none' : 'block' }}>
                            <Box sx={{ width:{ xs:'375px',sm: '100%',md: '600px' } ,display: movieTrailer?.key?.length === 0 ? 'none' : 'block', padding: '20px', marginLeft: { xs: '0px' }, marginRight: { xs:'10px' } }}>
                                {movieTrailer?.official && (
                                    <Box sx={{ width: {xs: '100%', sm: '100%',md: '600px' } ,bgcolor: (theme) => theme.vars.palette.platinum, padding: '20px', marginRight: {xs:'10px',sm:0,md:'20px'}, borderRadius: '20px' }}>
                                        <Typography sx={{ color : (theme) => theme.vars.palette.smokyDark, fontWeight: 'bolder' }}>
                                            {detail?.title && `Title - ${detail?.title}`}
                                            <span style={{ color : '#2072AF' }}>{detail?.name && `Name - ${detail?.name}`}</span>
                                        </Typography>
                                        <Typography sx={{ color : (theme) => theme.vars.palette.gray, display : 'flex', justifyContent : 'flex-start', alignItems: 'center', gap: 1.2 }}>
                                            {detail?.release_date && `Release Date - ${detail?.release_date}`}
                                            {detail?.birthday &&  `Birthday - ${detail?.birthday}`}
                                        </Typography>
                                        <Typography level={'h5'}>
                                            {detail?.place_of_birth}
                                        </Typography>
                                        <AspectRatio ratio="16/9" minHeight={150} maxHeight={300} sx={{ marginY : '20px' }}>
                                            <figure>
                                                <img
                                                    src={detail?.place_of_birth ? `${imageBaseUrl}/${detail?.profile_path}` : `${imageBaseUrl}/${detail?.backdrop_path}`}
                                                    srcSet={detail?.place_of_birth ? `${imageBaseUrl}/${detail?.profile_path}` : `${imageBaseUrl}/${detail?.backdrop_path}`}
                                                    loading="lazy"
                                                    alt="Yosemite by Casey Horner"
                                                />
                                            </figure>
                                        </AspectRatio>
                                        <Typography level={'h6'} sx={{ color : (theme) => theme.vars.palette.textGray, marginY: '10px' }}>
                                            {detail?.overview}
                                        </Typography>
                                        <Typography>
                                            {detail?.biography}
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center', gap: 1.5 }}>
                                            {detail?.vote_average > 0 && (
                                                <>
                                                    <Typography>Rating -</Typography>
                                                    <StarRatingComponent
                                                        name="rate2"
                                                        editing={false}
                                                        renderStarIcon={() => <TiStarFullOutline size={13}/>}
                                                        starCount={10}
                                                        value={detail?.vote_average}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        {detail?.runtime && (
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
                                                Run Time - <FcCamcorderPro size={20}/> <Typography sx={{ color: (theme) => theme.vars.palette.primary }}>{detail?.runtime} mins</Typography>
                                            </div>
                                        )}
                                        <div>
                                            {detail?.known_for_department && (
                                                <Typography sx={{ color: (theme) => theme.vars.palette.gold }}>
                                                    Know For Department - {detail?.known_for_department}
                                                </Typography>
                                            )}
                                        </div>
                                        <div>
                                            {detail?.popularity && (
                                                <Typography>
                                                    Popularity - <FcComboChart/> {detail?.popularity}
                                                </Typography>
                                            )}
                                        </div>
                                    </Box>
                                )}
                            </Box>
                    </Grid>
                </Grid>

                <MovieCard loading={isLoading} />
                <Box sx={{ width: { xs : '200px', md: '100%' } ,display: { xs: 'block' ,md: 'flex' }, justifyContent : { xs: 'center' ,md: 'end' }, marginX: { xs:0 } }}>
                    <Box sx={{ width: { xs: '200px' } ,display: 'block',marginTop: { md: '30px' }, marginLeft: { xs: '60px', sm: '50px', md: '0px' }, marginRight: { md: '220px' }, marginBottom: { md: '20px' } }}>
                        <Pagination
                            limit={0}
                            offset={0}
                            siblingRange={0}
                            disabled={isFetching}
                            defaultActivePage={1}
                            size={'small'}
                            reduced='true'
                            onPageChange={() => setPage(page+1)}
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            totalPages={1000}
                        />
                    </Box>
                </Box>
        </Box>

    )

}

export default RightSide