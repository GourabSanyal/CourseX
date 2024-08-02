import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button, IconButton, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "sonner";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
  // createdBy: string;
};

type CourseProps = {
  course: Course;
  userRole: string;
  userId: string | null;
  createdCourses?: Course[];
  purchasedCourses?: Course[];
  onDelete?: () => void;
  onEdit?: () => void;
  onBuy?: () => void;
  onview?: () => void;
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  const getData = async () => {
    const response = await axios.get("/api/auth/courses", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const data = response.data;
    setCourses(data);
  };

  useEffect(() => {
    getData();
  }, [router]);

  if (!courses.length) {
    <div>Loading Courses ...</div>;
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {/* {courses.map((course: Course) => {
        return <Course key={course._id} course={course} />;
      })} */}
    </div>
  );
}

export function Course({
  course,
  userRole,
  onDelete,
  onBuy,
  onEdit,
  userId,
  createdCourses,
  purchasedCourses,
}: CourseProps) {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async () => {
    console.log("course selected",course._id)
    setLoading(true)
    try {
      const response = await axios.post("/api/user/addToCart", { courseId: course._id });
      if (response.data.success) {
        if (response.data.inCart){
          setIsInCart(true);
        } else {
          setIsInCart(false)
        }
        toast.success(response.data.message || "Added to cart");
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error : any) {
      console.error("Error adding to cart:", error);
    toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally{
      setLoading(false)
    }
  };

  if (createdCourses) {
    var isCretedByAdmin = createdCourses.some((c) => c._id === course._id);
  }
  if (purchasedCourses) {
    var isPurchasedByUser = purchasedCourses.some((c) => c._id === course._id);
  }

  const renderButtons = () => {
    if (userRole === "admin") {
      // Admin panel
      if (isCretedByAdmin) {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={onDelete}
              style={{ marginRight: 8 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // router.push("/admin/" + courseId);
                onEdit && onEdit();
              }}
            >
              View admin
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // router.push("/admin/" + courseId);
                onEdit && onEdit();
              }}
            >
              Edit Admin
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // onView()
              }}
            >
              View admin
            </Button>
          </>
        );
      }
    } else if (userRole === "user") {
      // User panel
      if (isPurchasedByUser) {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // router.push("/user/view/" + courseId);
              }}
            >
              View Purchased
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // router.push("/user/view/" + courseId);
              }}
            >
              View user
            </Button>
            <IconButton
              onClick={handleAddToCart}
              color={isInCart ? "error" : "default"}
              disabled={loading}
            >
             {loading ? <CircularProgress size={24} /> : <ShoppingCartIcon />}
            </IconButton>
          </>
        );
      }
    }
  };

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {renderButtons()}
      </div>
    </Card>
  );
}
