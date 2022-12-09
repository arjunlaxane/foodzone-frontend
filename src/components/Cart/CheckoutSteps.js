import React from 'react';
import './CheckoutSteps.css';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Order Details</Typography>,
      icon: <DeliveryDiningIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className="checkout">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? 'green' : 'rgba(0, 0, 0, 0.649)',
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
