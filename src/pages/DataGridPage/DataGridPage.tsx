import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Menu,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useUser } from "../../hooks/useUser";
import { GridUser } from "../../types";
import {
  StyledContainer,
  PageHeader,
  PageTitle,
  HeaderActions,
  SearchField,
  StyledDataGrid,
  LoadingContainer,
  StatusChip,
  RoleChip,
} from "./styles";

export default function DataGridPage() {
  const { users, handleEdit, handleDelete, handleAdd, isLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<GridUser | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130, flex: 1 },
    { field: "lastName", headerName: "Last Name", width: 130, flex: 1 },
    { field: "email", headerName: "Email", width: 200, flex: 1.5 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <RoleChip
          icon={params.value === "Admin" ? <AdminIcon /> : <UserIcon />}
          label={params.value}
          size="small"
          variant="outlined"
          color={params.value === "Admin" ? "primary" : "default"}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <StatusChip
          icon={params.value === "Active" ? <CheckCircleIcon /> : <CancelIcon />}
          label={params.value}
          size="small"
          color={params.value === "Active" ? "success" : "error"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              setEditingUser(params.row);
              setFormData({
                firstName: params.row.firstName,
                lastName: params.row.lastName,
                email: params.row.email,
                role: params.row.role,
                status: params.row.status,
              });
              setDialogOpen(true);
            }}
          >
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleSubmit = () => {
  
    const errors = {
      firstName: !formData.firstName.trim() ? "First name is required" : "",
      lastName: !formData.lastName.trim() ? "Last name is required" : "",
      email: !formData.email.trim() ? "Email is required" : "",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    if (editingUser) {
      handleEdit({
        ...formData,
        id: editingUser.id,
      });
    } else {
      handleAdd({
        ...formData,
        id: Date.now(), 
      });
    }

    setDialogOpen(false);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredRows = useMemo(() => {
    return users.filter((row) => {
 
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchLower || 
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchLower);

    
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(
          filter => row.status === filter || row.role === filter
        );

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, selectedFilters, users]);

  return (
    <StyledContainer>
      <PageHeader>
        <PageTitle variant="h4">Users</PageTitle>
        <HeaderActions>
          <SearchField
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingUser(null);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                role: "User",
                status: "Active",
              });
              setDialogOpen(true);
            }}>
            Add User
          </Button>
        </HeaderActions>
      </PageHeader>

    
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Filter by Status
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MenuItem
              onClick={() => handleFilterChange('Active')}
              selected={selectedFilters.includes('Active')}
            >
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              Active
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterChange('Inactive')}
              selected={selectedFilters.includes('Inactive')}
            >
              <CancelIcon color="error" sx={{ mr: 1 }} />
              Inactive
            </MenuItem>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1.5 }}>
            Filter by Role
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MenuItem
              onClick={() => handleFilterChange('Admin')}
              selected={selectedFilters.includes('Admin')}
            >
              <AdminIcon color="primary" sx={{ mr: 1 }} />
              Admin
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterChange('User')}
              selected={selectedFilters.includes('User')}
            >
              <UserIcon sx={{ mr: 1 }} />
              User
            </MenuItem>
          </Box>
        </Box>
      </Menu>

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <StyledDataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      )}

  
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e: SelectChangeEvent) => 
                  setFormData(prev => ({ ...prev, role: e.target.value }))
                }
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e: SelectChangeEvent) => 
                  setFormData(prev => ({ ...prev, status: e.target.value }))
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingUser ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}
