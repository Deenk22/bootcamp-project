import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {convertDate} from "../../const/convertDate";
import {IconButton, TableFooter, TablePagination} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {IM_INVESTING_KEY} from "../../const/IM_investingKey";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import CustomModal from "../CustomModal/CustomModal";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const token = JSON.parse(localStorage.getItem(IM_INVESTING_KEY));

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const handleDeleteOperation = async (id) => {
  const res = await axios.delete(
    `http://localhost:3000/operation/${id}`,
    config
  );
  return res.data;
};

export default function CustomizedTables({allOperations}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleDeleteOperation,

    onSuccess: () => {
      queryClient.invalidateQueries("allOperations");
    },
  });

  const handleChangePage = (event, newPage) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOperations = allOperations?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{width: 800}}>
      <Table sx={{minWidth: 900}} aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Operation Type</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
            <StyledTableCell align="right">Price Open</StyledTableCell>
            <StyledTableCell align="right">Stop Loss</StyledTableCell>
            <StyledTableCell align="right">Take Profit</StyledTableCell>
            <StyledTableCell align="right">Price Close</StyledTableCell>
            <StyledTableCell align="right">Commission</StyledTableCell>
            <StyledTableCell align="right">Swap</StyledTableCell>
            <StyledTableCell align="right">Change Rate</StyledTableCell>
            <StyledTableCell align="right">Operation Date</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedOperations?.map((operation) => (
            <StyledTableRow key={operation.id}>
              <StyledTableCell component="th" scope="row">
                {operation.operationType}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.volume}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.priceOpen}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.stopLoss}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.takeProfit}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.priceClose}
              </StyledTableCell>
              <StyledTableCell align="right">
                {operation.commission}
              </StyledTableCell>
              <StyledTableCell align="right">{operation.swap}</StyledTableCell>
              <StyledTableCell align="right">
                {operation.changeRate}
              </StyledTableCell>
              <StyledTableCell align="right">
                {convertDate(operation.operationDate)}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => mutation.mutate(operation.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete">
                  <CustomModal />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              count={allOperations ? allOperations.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}