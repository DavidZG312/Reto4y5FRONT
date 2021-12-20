import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ orden, openModal, setData }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, padding: '10px' }}>
            <CardHeader
                style={{ textAlign: 'center' }}
                avatar={
                    <Avatar alt={orden.salesMan.name} sx={{ bgcolor: red[500] }} aria-label="recipe" src="/static/images/avatar/2.jpg">
                    </Avatar>
                }
                title={orden.salesMan.name.toUpperCase()}
                subheader={orden.status.toUpperCase()}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png"
                alt="orden"
            />
            <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    FECHA : {orden.registerDay.split("T")[0]}
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <Button onClick={() => {
                    setData(orden)
                    openModal()
                }}>
                    Mas Detalles
                </Button>
            </CardActions>
        </Card>
    );
}
