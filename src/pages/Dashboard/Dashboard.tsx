import {
  Box,

  Grid,

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
import { DataTable } from "../../components/DataTable/DataTable";
import { useApi } from "../../hooks/useApi";

import {StyledContainer,LoadingContainer,StyledDataContainer,StatsCard,PageTitle,StatIcon} from "./styles"

function Dashboard() {
  const { posts, isLoading, updatePost, deletePost, addPost } = useApi();
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

  const handleEdit = (post: any) => {
    updatePost.mutate(post);
  };

  const handleDelete = (id: number) => {
    deletePost.mutate(id);
  };

  const handleAdd = (post: Partial<any>) => {
    addPost.mutate(post);
  };

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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        )}
      </StyledDataContainer>
      
    </StyledContainer>
  );
}

export default Dashboard;
