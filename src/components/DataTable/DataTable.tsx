import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Snackbar,
  Alert,
  Fade,
  Typography,
  Tooltip,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { DataItem, DataTableProps } from "../../types";

import {
  StyledTableContainer,
  StyledPaper,
  StyledTableHead,
  StyledTableRow,
  ActionButton,
  SearchBox,
  SearchField,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  MobileCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardBody,
} from "./styles"


type SortDirection = "asc" | "desc" | null;

export function DataTable({ data, onEdit, onDelete, onAdd }: DataTableProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<DataItem>>({
    title: "",
    body: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastEditedId, setLastEditedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const theme = useTheme();

  const processedData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.body.toLowerCase().includes(searchLower)
      );
    }

    if (sortDirection) {
      result.sort((a, b) => {
        const compareResult = a.title.localeCompare(b.title);
        return sortDirection === "asc" ? compareResult : -compareResult;
      });
    }

    return result;
  }, [data, searchTerm, sortDirection]);

  useEffect(() => {
    if (lastEditedId) {
      const timer = setTimeout(() => {
        setLastEditedId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastEditedId]);

  const handleSort = () => {
    setSortDirection((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const getSortIcon = () => {
    if (sortDirection === "asc")
      return <ArrowUpwardIcon sx={{ fontSize: 16 }} />;
    if (sortDirection === "desc")
      return <ArrowDownwardIcon sx={{ fontSize: 16 }} />;
    return <FilterListIcon sx={{ fontSize: 16 }} />;
  };

  const handleOpen = (item?: DataItem) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
      setEditingId(item.id);
    } else {
      setFormData({ title: "", body: "" });
      setIsEditing(false);
      setEditingId(null);
    }
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ title: "", body: "" });
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSave = () => {
    if (!formData.title?.trim() || !formData.body?.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      if (isEditing && editingId) {
        onEdit(formData as DataItem);
        setLastEditedId(editingId);
      } else {
        onAdd(formData);
      }
      handleClose();
    } catch (err) {
      console.error("Save error:", err);
      setError("An error occurred while saving");
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      setDeletingId(id);
      await new Promise((resolve) => setTimeout(resolve, 500));
      onDelete(id);
    } catch (err) {
      console.error("Delete error:", err);
      setError("An error occurred while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        overflow: "hidden",
      }}>
      <SearchBox>
        <SearchField
          fullWidth
          placeholder="Search in title and content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
        <ActionButton
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "160px" },
          }}>
          Add New Post
        </ActionButton>
      </SearchBox>

     
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {processedData.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}>
            {searchTerm
              ? "No posts found matching your search"
              : "No posts available"}
          </Typography>
        ) : (
          processedData.map((item) => (
            <Fade key={item.id} in={deletingId !== item.id}>
              <MobileCard
                sx={{
                  ...(lastEditedId === item.id && {
                    animation: "highlight 2s",
                    "@keyframes highlight": {
                      "0%": {
                        backgroundColor: (theme) => theme.palette.primary.light,
                      },
                      "100%": {
                        backgroundColor: "transparent",
                      },
                    },
                  }),
                  ...(deletingId === item.id && {
                    animation: "fadeOut 0.5s",
                    "@keyframes fadeOut": {
                      "0%": {
                        opacity: 1,
                        backgroundColor: (theme) => theme.palette.error.light,
                      },
                      "100%": {
                        opacity: 0,
                        backgroundColor: (theme) => theme.palette.error.light,
                      },
                    },
                  }),
                }}>
                <CardContent>
                  <CardHeader>
                    <Box>
                      <CardTitle variant="subtitle1">{item.title}</CardTitle>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}>
                        ID: #{item.id}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Edit post">
                        <IconButton
                          onClick={() => handleOpen(item)}
                          color="primary"
                          disabled={deletingId === item.id}
                          size="small">
                          <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete post">
                        <IconButton
                          onClick={() => handleDeleteClick(item.id)}
                          color="error"
                          disabled={deletingId === item.id}
                          size="small">
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardHeader>
                  <CardBody>{item.body}</CardBody>
                </CardContent>
              </MobileCard>
            </Fade>
          ))
        )}
      </Box>

   
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <StyledTableContainer>
          <StyledPaper>
            <TableContainer>
              <Table stickyHeader>
                <StyledTableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        width: { sm: "10%" }, 
                      }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ width: { xs: "40%", sm: "30%" } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                        }}
                        onClick={handleSort}>
                        Title
                        <Tooltip
                          title={`Sort by title ${sortDirection ? `(${sortDirection})` : ""}`}>
                          {getSortIcon()}
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ width: { xs: "45%", sm: "45%" } }}>
                      Content
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        width: { xs: "15%", sm: "15%" },
                        pr: { xs: 1, sm: 2 },
                      }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {processedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        align="center"
                        sx={{
                          py: { xs: 4, sm: 8 },
                          px: { xs: 1, sm: 2 },
                        }}>
                        <Typography variant="body1" color="text.secondary">
                          {searchTerm
                            ? "No posts found matching your search"
                            : "No posts available"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    processedData.map((item) => (
                      <Fade key={item.id} in={deletingId !== item.id}>
                        <StyledTableRow
                          isedited={lastEditedId === item.id ? 1 : 0}
                          isdeleting={deletingId === item.id ? 1 : 0}>
                          <TableCell
                            sx={{
                              display: { xs: "none", sm: "table-cell" },
                              width: { sm: "10%" },
                            }}>
                            <Chip
                              label={`#${item.id}`}
                              size="small"
                              sx={{ backgroundColor: theme.palette.grey[600] }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "40%", sm: "30%" },
                              whiteSpace: { xs: "nowrap", sm: "normal" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: { xs: "120px", sm: "none" },
                            }}>
                            {item.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "45%", sm: "45%" },
                              whiteSpace: { xs: "nowrap", sm: "normal" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: { xs: "150px", sm: "none" },
                            }}>
                            {item.body}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              width: { xs: "15%", sm: "15%" },
                              pr: { xs: 1, sm: 2 },
                            }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: { xs: 0.5, sm: 1 },
                              }}>
                              <Tooltip title="Edit post">
                                <IconButton
                                  onClick={() => handleOpen(item)}
                                  color="primary"
                                  disabled={deletingId === item.id}
                                  size="small">
                                  <EditIcon
                                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete post">
                                <IconButton
                                  onClick={() => handleDeleteClick(item.id)}
                                  color="error"
                                  disabled={deletingId === item.id}
                                  size="small">
                                  <DeleteIcon
                                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      </Fade>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </StyledTableContainer>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: { xs: 1, sm: 2 },
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            margin: { xs: 2, sm: 4 },
            maxHeight: { xs: "calc(100% - 32px)", sm: "calc(100% - 64px)" },
          },
        }}>
        <StyledDialogTitle>
          <Typography variant="h6">
            {isEditing ? "Edit Post" : "Create New Post"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              display: { xs: "none", sm: "block" },
            }}>
            {isEditing
              ? "Update the post details below"
              : "Fill in the information below to create a new post"}
          </Typography>
        </StyledDialogTitle>
        <Divider />
        <StyledDialogContent>
          <TextField
            autoFocus
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!formData.title?.trim() && error !== null}
            helperText={
              !formData.title?.trim() && error ? "Title is required" : ""
            }
            variant="outlined"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: { xs: 1, sm: 1.5 },
              },
            }}
          />
          <TextField
            label="Content"
            name="body"
            value={formData.body}
            onChange={handleChange}
            error={!formData.body?.trim() && error !== null}
            helperText={
              !formData.body?.trim() && error ? "Content is required" : ""
            }
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            InputProps={{
              sx: {
                borderRadius: { xs: 1, sm: 1.5 },
              },
            }}
          />
        </StyledDialogContent>
        <Divider />
        <StyledDialogActions
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "stretch",
            padding: { xs: 2, sm: 3 },
            gap: { xs: 1, sm: 2 },
          }}>
          <Button
            onClick={handleClose}
            fullWidth={true}
            sx={{
              display: { xs: "block", sm: "none" },
              color: "text.secondary",
              textTransform: "none",
              order: { xs: 2, sm: 1 },
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            fullWidth={true}
            sx={{
              px: { xs: 2, sm: 3 },
              textTransform: "none",
              borderRadius: { xs: 1, sm: 1.5 },
              order: { xs: 1, sm: 2 },
            }}>
            {isEditing ? "Save Changes" : "Create Post"}
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              display: { xs: "none", sm: "block" },
              color: "text.secondary",
              textTransform: "none",
            }}>
            Cancel
          </Button>
        </StyledDialogActions>
      </Dialog>

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
        }}>
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: { xs: 1, sm: 2 },
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
