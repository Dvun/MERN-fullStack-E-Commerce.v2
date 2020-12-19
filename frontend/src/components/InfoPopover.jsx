import React, {useState} from 'react'
import {Typography, Box, Button} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const InfoPopover = () => {

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            color="secondary" {...bindTrigger(popupState)}
            style={{position: 'absolute', right: '10px', bottom: '10%', width: '40px', borderRadius: '50%'}}>
            Open INFO
          </Button>
          <Popover
            style={{inset: '-35%'}}
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={10} >
              <Typography>
                <h4>This is a DEMO React Shop.</h4>
                <p>
                  <p>You can register as a NEW user for testing. <br/></p>
                  For testing <strong>ADMIN FUNCTIONS</strong>, login as a admin: <br/>
                  <strong style={{marginRight: '31px'}}>email: </strong> <strong>admin@shop.com</strong> <br/>
                  <strong>password: </strong> <strong>admin12345</strong> <br/>
                </p>
                <p>
                  If You want to buy some products and pay for this, <br/>
                  You can try pay with virtual PayPal account <br/>
                  <strong style={{marginRight: '34px'}}>email: </strong>    <strong>john.doe@gmx.com</strong> <br/>
                  <strong>password: </strong> <strong>Jalapeno1</strong> <br/>
                </p>
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default InfoPopover