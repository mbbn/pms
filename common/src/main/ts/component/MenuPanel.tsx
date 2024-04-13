import * as React from 'react';
import {Link} from 'react-router-dom';
import {
    Paper
} from '@mui/material';
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view';
import {ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon} from '@mui/icons-material';
import {lightBlue, common} from '@mui/material/colors';
import {useApp} from "@common/entrypoint/BaseEntryPoint";
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import {useLocal} from "@common/provider/LocalProvider";

interface MenuProps {
    sx?: SxProps<Theme>;
}

function MenuPanel(props: MenuProps) {
    const app = useApp();
    const local = useLocal();
    const {sx} = props;

    return <Paper variant="outlined" elevation={0} square={false}
                  sx={{padding: 1, backgroundColor: common.white, paddingBottom: 2, ...sx}}>
        <div style={{
            fontSize: 16,
            fontWeight: 'bold',
            borderBottomColor: lightBlue[200],
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            paddingRight: 15,
            paddingBottom: 10,
            marginBottom: 5
        }}>{local.getBaseMessage('menu')}</div>
        <SimpleTreeView aria-label="file system navigator"
        sx={{display: 'block'}}
                        slots={{
                            expandIcon: ChevronRightIcon,
                            collapseIcon: ExpandMoreIcon
                        }}>
            {app.menus ? app.menus.map((menu, index) => <TreeItem key={menu.id} itemId={'' + index} label={menu.path ? <Link to={menu.path}>{menu.title}</Link> : menu.title}>
                {menu.subMenu ? menu.subMenu.map((subMenu, subMenuIndex) => <TreeItem key={menu.id + '-' + subMenu.id}
                                                                                      itemId={'' + index + subMenuIndex}
                                                                                      label={subMenu.path ? <Link to={subMenu.path}>{subMenu.title}</Link> : subMenu.title}/>) : null}
            </TreeItem>) : null}
        </SimpleTreeView>
    </Paper>
}

export default MenuPanel;