import * as React from 'react';
import Menu from '@mui/material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Badge, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export interface Data {
    id: number;
    estadoTapa: string;
    fechahora: string;
}
interface UserNodos {
    userNodos: Data[];
}

export default function PositionedMenu({ userNodos }: UserNodos) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <IconButton
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='inherit'
            >
                <Badge color="secondary" badgeContent={userNodos && Array.isArray(userNodos) ? userNodos.length : 0}>
                    <NotificationsActiveIcon />
                </Badge>
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        width: 'auto', // Aumenta el ancho del menú
                        height: 'auto', // Aumenta el alto del menú
                    },
                }}
            >
                {userNodos && Array.isArray(userNodos) && userNodos.sort((a, b) => {
                    
                    // Orden descendente basado en las cadenas de fecha
                    return b.fechahora.localeCompare(a.fechahora);
                }).map((nodo) => (
                    <ListItemButton key={nodo.id}>
                        
                        <ListItemIcon>
                            <PetsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={nodo.estadoTapa}
                            secondary={nodo.fechahora.split('T')[1].split('.')[0]}
                        />
                    </ListItemButton>
                ))}
            </Menu>
        </div>
    );
}
