import * as React from 'react';
import {
    Paper
} from '@mui/material';
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view';
import {ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon} from '@mui/icons-material';
import {blueGrey, lightBlue, common} from '@mui/material/colors';
import {getBaseMessage} from '../provider/LocalProvider'
import {useApp} from "@common/entrypoint/BaseEntryPoint";
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface MenuProps {
    sx?: SxProps<Theme>;
}

function MenuPanel(props: MenuProps) {
    const app = useApp();
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
        }}>{getBaseMessage('menu')}</div>
        <SimpleTreeView aria-label="file system navigator"
        sx={{display: 'block'}}
                        slots={{
                            expandIcon: ChevronRightIcon,
                            collapseIcon: ExpandMoreIcon
                        }}>
            {app.menus.map((menu, index) => <TreeItem key={menu.id} itemId={'' + index} label={<div onClick={event => event.stopPropagation()}>
                <div onClick={() => menu.path ? window.location.href = menu.path : null}>{menu.title}</div>
            </div>} >
                {menu.subMenu ? menu.subMenu.map((subMenu, subMenuIndex) => <TreeItem key={menu.id+'-'+subMenu.id} itemId={''+index + subMenuIndex}
                                                                                      label={subMenu.title}/>) : null}
            </TreeItem>)}
        </SimpleTreeView>
    </Paper>
}

export default MenuPanel;