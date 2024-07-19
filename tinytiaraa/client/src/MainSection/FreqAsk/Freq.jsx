import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import './Freq.css'
import freq1 from './images/freq1.svg'
import freq2 from './images/freq2.svg'
import freq3 from './images/freq3.svg'
import freq4 from './images/freq4.svg'
import freq5 from './images/freq5.svg'
import freq6 from './images/freq6.svg'
import freq7 from './images/freq7.svg'
import freq8 from './images/freq8.svg'
import freq9 from './images/freq9.svg'
import freq10 from './images/freq10.svg'




const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',

  },
  margin:'10px',
  fontFamily: "Poppins",

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary 
    expandIcon={<ExpandMoreIcon />}
    
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgb(255, 255, 255)'
      : 'rgb(255, 255, 255)',
     
  flexDirection: 'coloumn-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  padding:'20px 25px',
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

 function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="freqques">
        <h1>Frequently Asked Questions</h1>
        <p>See some common questions and answers below, or call us at +91 86570 62511</p>
        <div className="accordiansmain">

       

    <div className='accordiansleft'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
            <img src={freq1} alt="" />
          <Typography>What materials are used in Tiny Tiaraa jewellery?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our jewellery is made from hypoallergenic and non-toxic materials, ensuring safety and comfort for kids and infants.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <img src={freq2} alt="" />
          
          <Typography>Can I find jewellery for special occasions?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, we offer a variety of designs perfect for birthdays, naming ceremonies, and other special moments.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <img src={freq3} alt="" />
          
          <Typography>Are there adjustable sizes available?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Many of our pieces come with adjustable features to grow with your child.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <img src={freq4} alt="" />
          
          <Typography>How do I place an order online?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Simply select the items you wish to purchase, add them to your cart, and follow the checkout process on our website.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <img src={freq5} alt="" />
          
          <Typography>What is your policy on exchanges?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Exchanges can be made within 7 days of purchase for items in their original condition.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
    <div className="accordiansright">
    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <img src={freq6} alt="" />
          
          <Typography>What should I do if I receive a defective product?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Contact our customer service immediately to arrange for a replacement or refund.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
            <img src={freq7} alt="" />
          
          <Typography>Do you offer gift wrapping?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, we provide gift-wrapping services for a small additional charge.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
            <img src={freq8} alt="" />
          
          <Typography>How often do you introduce new designs?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We introduce new collections seasonally and on special occasions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
            <img src={freq9} alt="" />
          <Typography>Can I get jewellery customized for my child?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, we offer customization Services, Just upload the design you want to get manufactured and we will bring it to you in reality.  
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
        <img src={freq10} alt="" />

          <Typography>How can I find out about promotions and new releases?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Typography>
          Subscribe to our newsletter or follow us on social media for updates on promotions and new arrivals.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    </div>
    <button className='freqbtn'>Shop Now</button>
    </div>

  );
}

export default CustomizedAccordions