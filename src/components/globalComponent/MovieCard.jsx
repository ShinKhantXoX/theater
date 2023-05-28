import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import {FcApproval} from 'react-icons/fc';
import StarRatingComponent from 'react-star-rating-component';
import {useEffect, useState} from "react";
import {useGetDetailsQuery, useGetMovieTrailerQuery} from "../../features/api/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {Favorite, Visibility} from "@mui/icons-material";
import {imageBaseUrl} from "../../utilities/endpoints";
import {FcComboChart} from 'react-icons/fc';
import {TiStarFullOutline} from "react-icons/ti";
import {CgDetailsMore} from "react-icons/cg";
import {IoPlay} from "react-icons/io5";
import {FcCamcorderPro} from "react-icons/fc";
import {
    Alert,
    CircularProgress,
    Grid,
    LinearProgress,
    Modal,
    ModalClose,
    ModalDialog
} from "@mui/joy";
import {getMovieTrailer} from "../../redux/slice/movieTrailerSlice";
import {getMovieDetail} from "../../redux/slice/movieDetailSlice";

const MovieCard = ({ loading }) => {

    const [movie,setMovie] = useState({});
    const [category,setCategory] = useState('all');
    const [openModal,setOpenModal] = useState(false);
    const [detail,setDetail] = useState(true);
    const [detailId,setDetailId] = useState(0);
    const [alert,setAlert] = useState(false);

    const [trailerId,setTrailerId] = useState(0);
    const [trailer,setTrailer] = useState(true);

    const dispatch = useDispatch();


    const {data} = useGetDetailsQuery({
        cat : category,
        id : detailId,
        apiKey : 'bc6c556b600e6ef3a30b3547bdcc0174',
    }, { skip : detail })

    const MovieResponse = useSelector((state) => state);
    // console.log(movie)
    const {data: movieTrailer} = useGetMovieTrailerQuery({
        movieId: trailerId,
        apiKey: 'bc6c556b600e6ef3a30b3547bdcc0174'
    }, {skip: trailer});
    console.log(movieTrailer?.results.find(vd => vd.name === 'Official Trailer'))
    if(movieTrailer?.results.find(vd => vd.name === 'Official Trailer') !== undefined){
        dispatch(getMovieTrailer(movieTrailer?.results.find(vd => vd.name === 'Official Trailer')));
        dispatch(getMovieDetail(data));
    }

    const handlePlay = (movie) => {
        if(movie?.media_type !== 'person' && movie?.media_type !== 'tv'){
            {setTrailerId(movie?.id),
                setTrailer(false),
                setDetailId(movie?.id),
                setDetail(false),
                setCategory(movie?.media_type),
                window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
        }else {
            setAlert(true);
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            setTimeout(() => {
                setAlert(false)
            },3000)
        }


    }

    useEffect(() => {
        setMovie(MovieResponse)
    }, [MovieResponse])

    return (
        <>
            {loading ? (<CircularProgress sx={{ color : (theme) => theme.vars.palette.gold }} variant="soft" />) : (
                <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ flexGrow: 1, width: { xs: '100%',sm:'820px',md:'100%' }, overflowX:"hidden", mx:{ xs:'auto' } }}
                    direction={'row'}
                    display={'flex'}
                    justifyContent="center"
                    alignItems="center"
                >
                    {alert &&
                        <Box sx={{ height: '100vh', position: 'absolute', right:{ xs: '25px' ,sm: '30px' ,md: '30px' }, top:{ xs: '20px' ,sm: '70px',md: '70px' } }}>
                            <Alert variant={'solid'} color="warning">
                                This feature is unavailable!!!
                            </Alert>
                        </Box>
                    }
                    {movie.movieReducer?.results?.map(movie => (
                        <Grid key={`movie_id_${movie.id}`} item xs={8} sm={4} md={3}>
                            {/*{movie?.backdrop_path || movie?.poster_path || movie?.profile_path && (*/}
                                <Grid item
                                >
                                    <Card
                                        sx={{
                                            width: { xs: '350px', sm: '350px', md: '300px' },
                                            bgcolor : (theme) => theme.vars.palette.platinum,
                                            boxShadow: 'none',
                                            '--Card-padding': '0px',
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}
                                        >
                                            <AspectRatio ratio="4/4">
                                                <figure>
                                                    <img
                                                        src={movie?.media_type !== 'person' ? `${imageBaseUrl}/${movie?.poster_path}` : `${imageBaseUrl}/${movie?.known_for[0]?.backdrop_path}`}
                                                        srcSet={movie?.media_type !== 'person' ? `${imageBaseUrl}/${movie?.poster_path}` : `${imageBaseUrl}/${movie?.known_for[0]?.backdrop_path}`}
                                                        loading="lazy"
                                                        alt="Yosemite by Casey Horner"
                                                    />
                                                </figure>
                                            </AspectRatio>
                                            <CardCover
                                                className="gradient-cover"
                                                sx={{
                                                    '&:hover, &:focus-within': {
                                                        opacity: 1,
                                                    },
                                                    opacity: { xs: 1, sm: 1, md: 0 },
                                                    transition: '0.1s ease-in',
                                                    backdropFilter: 'blur(1.2px) brightness(.9)',
                                                    background:
                                                        'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                                                }}
                                            >
                                                {/* The first box acts as a container that inherits style from the CardCover */}
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            p: 2,
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: 1.5,
                                                            flexGrow: 1,
                                                            alignSelf: 'flex-end',
                                                        }}
                                                    >
                                                        <Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
                                                            <Link
                                                                href="#"
                                                                overlay
                                                                underline="none"
                                                                sx={{
                                                                    color: '#fff !important',
                                                                    textOverflow: 'ellipsis',
                                                                    overflow: 'hidden',
                                                                    display: 'block',
                                                                }}
                                                            >
                                                                {movie?.media_type === 'person' && movie?.name?.substring(0,8)}
                                                                {movie?.media_type === 'tv' && movie?.name?.substring(0,8)}
                                                                {movie?.title?.length >= 5 ? movie?.title?.substring(0,8) : movie?.title} ...
                                                            </Link>
                                                        </Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5.5 }}>
                                                            <IconButton size="md" color="neutral" onClick={() => (setOpenModal(true),setDetailId(movie?.id),setCategory(movie?.media_type),setDetail(false))}>
                                                                <CgDetailsMore />
                                                            </IconButton>
                                                            <IconButton size="md" sx={{ color: (theme) => theme.vars.palette.whiteSmoke ,bgcolor: (theme) => theme.vars.palette.danger }} onClick={() => handlePlay(movie)}>
                                                                <IoPlay />
                                                            </IconButton>
                                                        </div>
                                                    </Box>
                                                </Box>
                                            </CardCover>
                                        </Box>
                                        {movie?.media_type !== 'person' && (
                                            <Typography sx={{ fontSize: 'sm', fontWeight: 'md', display : 'flex', alignItems : 'center', gap : 2, mt: 1.5, paddingX : 1.5 }}>
                                                Release Date <FcApproval/>{movie?.media_type === 'tv' ? movie?.first_air_date : movie?.release_date}
                                            </Typography>
                                        )}
                                        <Box sx={{ display: 'flex', gap: 1, marginY: 1.5, paddingX : 1.5, alignItems: 'center' }}>
                                            <Avatar
                                                src={movie?.media_type === 'person' ? `${imageBaseUrl}/${movie?.profile_path}` : `${imageBaseUrl}/${movie?.backdrop_path}`}
                                                size="sm"
                                                sx={{ '--Avatar-size': '1.5rem' }}
                                            />
                                            <Typography sx={{ fontSize: 'sm', fontWeight: 'md' }}>
                                                {movie?.media_type === 'person' && movie?.name?.substring(0,6)}
                                                {movie?.media_type === 'tv' && movie?.original_name?.substring(0,6)}
                                                {movie?.original_title?.length > 6 ? movie?.original_title?.substring(0,6) : movie?.original_title} ...
                                            </Typography>
                                            <Chip
                                                variant="outlined"
                                                color="neutral"
                                                size="sm"
                                                sx={{
                                                    borderRadius: 'sm',
                                                    py: 0.25,
                                                    px: 0.5,
                                                }}
                                            >
                                                {movie?.media_type}
                                            </Chip>
                                            <Link
                                                href="#dribbble-shot"
                                                level="body3"
                                                underline="none"
                                                startDecorator={<Favorite />}
                                                sx={{
                                                    fontWeight: 'md',
                                                    ml: 'auto',
                                                    color: 'text.secondary',
                                                    '&:hover': { color: 'danger.plainColor' },
                                                }}
                                            >
                                                117
                                            </Link>
                                            <Link
                                                href="#dribbble-shot"
                                                level="body3"
                                                underline="none"
                                                startDecorator={<Visibility />}
                                                sx={{
                                                    fontWeight: 'md',
                                                    color: 'text.secondary',
                                                    '&:hover': { color: 'primary.plainColor' },
                                                }}
                                            >
                                                {movie?.popularity > 1000 ? movie?.popularity+"M" : movie?.popularity+"K"}
                                            </Link>
                                        </Box>
                                        <LinearProgress thickness={1} size="sm" sx={{ color : (theme) => theme.vars.palette.primary, marginX : '10px' }} />
                                    </Card>
                                </Grid>
                            {/*)}*/}
                        </Grid>
                        ))}
                </Grid>
            )}


            <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            >
                <ModalDialog layout="center" sx={{ width : { xs: '350px', md: '600px' }, height: 'auto', overflowY: 'auto', overflowX : 'hidden' }}>
                    <ModalClose />
                    <Typography sx={{ color : (theme) => theme.vars.palette.smokyDark, fontWeight: 'bolder' }}>
                        {data?.title && `Title - ${data?.title}`}
                        <span style={{ color : '#2072AF' }}>{data?.name && `Name - ${data?.name}`}</span>
                    </Typography>
                    <Typography sx={{ color : (theme) => theme.vars.palette.gray, display : 'flex', justifyContent : 'flex-start', alignItems: 'center', gap: 1.2 }}>
                        {data?.release_date && `Release Date - ${data?.release_date}`}
                        {data?.birthday &&  `Birthday - ${data?.birthday}`}
                    </Typography>
                    <Typography level={'h5'}>
                        {data?.place_of_birth}
                    </Typography>
                    <AspectRatio ratio="16/9" minHeight={150} maxHeight={300} sx={{ marginY : '20px' }}>
                        <figure>
                            <img
                                src={data?.place_of_birth ? `${imageBaseUrl}/${data?.profile_path}` : `${imageBaseUrl}/${data?.backdrop_path}`}
                                srcSet={data?.place_of_birth ? `${imageBaseUrl}/${data?.profile_path}` : `${imageBaseUrl}/${data?.backdrop_path}`}
                                loading="lazy"
                                alt="Yosemite by Casey Horner"
                            />
                        </figure>
                    </AspectRatio>
                    <Typography level={'h6'} sx={{ color : (theme) => theme.vars.palette.textGray, marginY: '10px' }}>
                        {data?.overview}
                    </Typography>
                    <Typography>
                        {data?.biography}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center', gap: 1.5 }}>
                        {data?.vote_average > 0 && (
                            <>
                                <Typography>Rating -</Typography>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    renderStarIcon={() => <TiStarFullOutline size={13}/>}
                                    starCount={10}
                                    value={data?.vote_average}
                                />
                            </>
                        )}
                    </div>
                    {data?.runtime && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
                            Run Time - <FcCamcorderPro size={20}/> <Typography sx={{ color: (theme) => theme.vars.palette.primary }}>{data?.runtime} mins</Typography>
                        </div>
                    )}
                    <div>
                        {data?.known_for_department && (
                            <Typography sx={{ color: (theme) => theme.vars.palette.gold }}>
                                Know For Department - {data?.known_for_department}
                            </Typography>
                        )}
                    </div>
                    <div>
                        {data?.popularity && (
                            <Typography>
                                Popularity - <FcComboChart/> {data?.popularity}
                            </Typography>
                        )}
                    </div>
                </ModalDialog>
            </Modal>


        </>

    )
}

export default MovieCard