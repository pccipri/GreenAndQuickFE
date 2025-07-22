"use client";

import { FC } from "react";

import Button from "@mui/material/Button";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

const ProductPage: FC = () => {
    function createData(
        name: string,
        calories: string,
        riValue: string,
    ) {
        return { name, calories, riValue };
    }

    const rows = [
        createData('Energy', '362kJ / 85kcal', 'Less than 1%'),
        createData('Fat', '<0.5g', 'Less than 1%'),
        createData('Saturates', '<0.1g', 'Less than 1%'),
        createData('Carbohydrate', '<0.5g', 'Less than 1%'),
        createData('Sugars', '18.1g', '3%'),
        createData('Fibre', '1.4g', '2%'),
        createData('Protein', '<0.5g', 'Less than 1%'),
        createData('Salt', '<0.01g', 'Less than 1%'),
    ];

    return (
        <>
            <div className="parent-container-product"
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >

                {/* Wraps the product image and information */}
                <div className="product-container"
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        backgroundColor: 'white'
                    }}
                >
                    {/* Container for the product image */}
                    <div className="product-image"
                        style={{
                            height: '100%',
                            width: '45%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '50px'
                        }}
                    >
                        <img src="/images/bgplaceholder.jpeg" alt="Product" height="530px" width="530px" />
                    </div>

                    {/* Container for the product information */}
                    <div className="product-information"
                        style={{
                            height: '100%',
                            width: '55%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            padding: '50px'
                        }}
                    >
                        <div className="product-rating"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <h1 style={{ marginTop: '10px' }}>Product Name</h1>
                            <Rating name="half-rating-read" precision={0.5} value={4.5} size="medium" readOnly />
                        </div>
                        <h4 style={{ marginTop: '10px' }}>Producer Name</h4>

                        <h2 style={{ margin: '20px 0' }}>$7.50</h2>

                        <p style={{ margin: '20px 0' }}>Product description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s</p>

                        <Button variant="contained" style={{ margin: '40px 0' }}>Add to cart</Button>

                        {/* Accordion for product details */}
                        <Accordion style={{ width: '100%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='1-content'
                                id='1-header'
                            >
                                <Typography component="span"><h4>Nutrition</h4></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ padding: '20px' }}>
                                <p style={{ marginBottom: '20px' }}>Table of Nutritional Information</p>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Typical values</b></TableCell>
                                                <TableCell align="right"><b>per 100g</b></TableCell>
                                                <TableCell align="right"><b>% based on RI for Average Adult</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <b>{row.name}</b>
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.riValue}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <p style={{ marginTop: '40px', marginBottom: '10px' }}>RI = Reference intake of an average adult (8400 kJ / 2000 kcal)</p>
                                <p>This pack contains 2 servings.</p>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ width: '100%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='2-content'
                                id='2-header'
                            >
                                <Typography component="span"><h4>Origin</h4></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ padding: '20px' }}>
                                <p>Grown in Cameroon, Colombia, Dominican Republic, Ghana, Panama</p>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ width: '100%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='3-content'
                                id='3-header'
                            >
                                <Typography component="span"><h4>Storage</h4></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ padding: '20px' }}>
                                <p>Store in a cool, dry place away from strong light. Do not refrigerate.</p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>

                {/* Wraps the comments section */}
                <div className="comments-container"
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '50px',
                        backgroundColor: 'white'
                    }}
                >
                    <h2 style={{ marginBottom: '20px' }}>Comments</h2>


                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Write your comment here"
                                            multiline
                                            maxRows={4}
                                            style={{ width: '100%' }}
                                        />
                                        <Button variant="contained" style={{ margin: '20px 0' }}>Submit</Button>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div className="comment-header"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '20px'
                                        }}
                                    >
                                        <p>Ali Conors</p>
                                        <Rating name="half-rating-read" precision={0.5} value={5} size="small" readOnly />
                                    </div>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            Very nice product!
                                        </Typography>
                                        {" — I really enjoyed this product. It has a great taste and quality."}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div className="comment-header"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '20px'
                                        }}
                                    >
                                        <p>Ali Conors</p>
                                        <Rating name="half-rating-read" precision={0.5} value={5} size="small" readOnly />
                                    </div>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            Very nice product!
                                        </Typography>
                                        {" — I really enjoyed this product. It has a great taste and quality."}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div className="comment-header"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '20px'
                                        }}
                                    >
                                        <p>Ali Conors</p>
                                        <Rating name="half-rating-read" precision={0.5} value={5} size="small" readOnly />
                                    </div>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            Very nice product!
                                        </Typography>
                                        {" — I really enjoyed this product. It has a great taste and quality."}
                                    </>
                                }
                            />
                        </ListItem>
                    </List>
                </div>
            </div>
        </>
    );
};

export default ProductPage;