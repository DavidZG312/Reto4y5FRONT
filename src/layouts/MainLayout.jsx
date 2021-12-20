import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';

import { usuarioAction } from '../redux/actions/AuthAction'

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {

	// Dispatch Instance
	const dispatch = useDispatch();

	// Redux State Extraction
	const { user } = useSelector((state) => state.auth);

	//Router
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const [pages, setPages] = useState([])

	const settings = [
		{ title: 'Perfil', action: 'profile' },
		{ title: 'Cerrar Sesión', action: 'logout' },
	];

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// Session Keep
	useEffect(() => {
		if (user && user.id) {
			if (user.type === "ADMIN") {
				setPages([
					{ title: 'Usuarios', url: '/usuarios' },
					{ title: 'Productos', url: '/productos' },
					{ title: 'Ordenes', url: '/ordenes' }
				])
			} else if (user.type === "ASE") {
				setPages([
					{ title: 'Productos', url: '/productos' },
					{ title: 'Ordenes', url: '/ordenes' }
				])
			} else {
				setPages([
					{ title: 'Productos', url: '/productos' },
				])
			}
		} else {
			const object = JSON.parse(sessionStorage.getItem('userData'));

			if (object !== null) {
				dispatch(usuarioAction(object));
				if (object.type === "ADMIN") {
					setPages([
						{ title: 'Usuarios', url: '/usuarios' },
						{ title: 'Productos', url: '/productos' },
						{ title: 'Ordenes', url: '/ordenes' }
					])
				} else if (object.type === "ASE") {
					setPages([
						{ title: 'Productos', url: '/productos' },
						{ title: 'Ordenes', url: '/ordenes' }
					])
				} else {
					setPages([
						{ title: 'Productos', url: '/productos' },
					])
				}
			} else {
				navigate('/');
			}
		}
	}, [user]);

	const handleClick = action => {
		switch (action) {
			case "logout":
				cerrarSesion()
				break;

			default:
				break;
		}

	}

	async function cerrarSesion() {
		await sessionStorage.removeItem('userData');
		window.location.href = '/';
	}

	return (
		<div style={{ display: 'flex' }} id="title">
			<CssBaseline />
			<AppBar position="static"
				style={{
					position: 'absolute',
					zIndex: 1000,
					backgroundColor: '#2196f3'
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							<img src="/favicon.png" style={{ height: 50, borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigate("/home")} />
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.title} onClick={() => {
										handleCloseNavMenu()
										navigate(page.url)
									}}>
										<Typography textAlign="center">{page.title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
						>
							<img src="/favicon.png" style={{ height: 50, borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigate("/home")} />
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page.title}
									onClick={() => {
										handleCloseNavMenu()
										navigate(page.url)
									}}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.title}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem key={setting.title} onClick={() => {
										handleCloseNavMenu()
										handleClick(setting.action)
									}}>
										<Typography textAlign="center">{setting.title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>

	);
};
export default ResponsiveAppBar;
