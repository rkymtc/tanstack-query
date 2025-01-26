import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DataTable } from "../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  "& svg": {
    fontSize: 24,
    color: theme.palette.common.white,
  },
}));

const StyledDataContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

function Dashboard() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => apiService.getPosts()
  });

  const theme = useTheme();

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: <ArticleIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "Active Users",
      value: new Set(posts.map((post) => post.userId)).size.toString(),
      icon: <PeopleIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Recent Edits",
      value: "23",
      icon: <EditIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: "Trending Posts",
      value: "12",
      icon: <TrendingUpIcon />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      <PageTitle variant="h4">Dashboard</PageTitle>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard>
              <StatIcon sx={{ bgcolor: stat.color }}>{stat.icon}</StatIcon>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {isLoading ? <CircularProgress size={24} /> : stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      <StyledDataContainer>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Posts Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your posts and content
          </Typography>
        </Box>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <DataTable
            data={posts}
            onEdit={() => {}}
            onDelete={() => {}}
            onAdd={() => {}}
          />
        )}
      </StyledDataContainer>
    </StyledContainer>
  );
}

export default Dashboard;
