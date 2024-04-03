import * as React from 'react';
import {
    Paper
} from '@mui/material';
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view';
import {ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon} from '@mui/icons-material';
import {blueGrey, lightBlue, common} from '@mui/material/colors';
import {getBaseMessage} from '../provider/LocalProvider'
import {useApp} from "@common/entrypoint/BaseEntryPoint";

function MenuPanel() {
    const app = useApp();

    return <Paper variant="elevation" elevation={0} square={false}
                  style={{padding: 5, backgroundColor: common.white, paddingBottom: 5}}>
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
                        slots={{
                            expandIcon: ChevronRightIcon,
                            collapseIcon: ExpandMoreIcon
                        }}>
            {app.menus.map((menu, index) => <TreeItem itemId={'' + index} label={menu.title}>
                {menu.subMenu ? menu.subMenu.map((subMenu, subMenuIndex) => <TreeItem itemId={''+index + subMenuIndex}
                                                                                      label={subMenu.title}/>) : null}
            </TreeItem>)}
        </SimpleTreeView>
    </Paper>
}

export default MenuPanel;