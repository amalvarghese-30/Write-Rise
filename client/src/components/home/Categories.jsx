import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

// Styled Table
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

// Styled Button
const StyledButton = styled(Button)`
    margin: 20px;
    width: 88%;
    background: #000;
    color: #fff;
    text-decoration: none;
    &:hover {
        background: #333; // Darker shade for hover effect
    }
`;

// Styled Table Cell with Hover Effect
const StyledTableCell = styled(TableCell)`
    &:hover {
        background-color: #000; // Change background color on hover
        color: white; // Change text color on hover
        cursor: pointer; // Change cursor to pointer
    }
`;

// Styled Link
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit; // Inherit color from parent
    display: block;
    width: 100%;
    height: 100%; // Make link take the full cell area
    padding: 10px 15px; // Optional: Add padding for better spacing
    box-sizing: border-box; // Ensure padding is inside the box
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            {/* Create Blog Button */}
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>

            {/* Categories Table */}
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <StyledTableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
