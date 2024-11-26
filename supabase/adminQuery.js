const supabase = require("../supabase/db-connection");

const insertNotifications = async (notificationData) => {
  const { message, title, className, div } = notificationData;

  try {
    const { data, error } = await supabase
      .from("notification")
      .insert([{ message, title, className, div }])
      .select(); 

    if (error) {
      console.error("Error inserting notification:", error);
      return { error: "Failed to insert notification" };
    }

    if (data && data.length > 0) {
      return { status: "success", data: data[0] }; 
    }

    return { error: "No data inserted" }; 
  } catch (error) {
    console.error("Unexpected error in insertNotifications:", error);
    return { error: "An unexpected error occurred" };
  }
};

const insertAbsentese = async (absenteseData) => {
  const { monthData, admNo } = absenteseData;

  if (!monthData || !admNo) {
    return { error: "Both monthData and admNo are required" };
  }

  try {
    const { data: existingData, error: fetchError } = await supabase
      .from("absent")
      .select("monthData")
      .eq("admNo", admNo);

    if (fetchError) {
      console.error("Error fetching absentee data:", fetchError);
      return { error: "Failed to fetch absentee data" };
    }

    if (existingData && existingData.length > 0) {
      const existingMonthData = existingData[0].monthData;
      const updatedMonthData = Array.from(
        new Set([...existingMonthData.split(","), monthData])
      ).join(",");

      const { error: updateError } = await supabase
        .from("absent")
        .update({ monthData: updatedMonthData })
        .eq("admNo", admNo);

      if (updateError) {
        console.error("Error updating absentee data:", updateError);
        return { error: "Failed to update absentee data" };
      }

      return { status: "success", data: { admNo, monthData: updatedMonthData } };
    } else {
      const { data, error: insertError } = await supabase
        .from("absent")
        .insert([{ monthData, admNo }])
        .select();

      if (insertError) {
        console.error("Error inserting absentee data:", insertError);
        return { error: "Failed to insert absentee data" };
      }

      return { status: "success", data: data[0] };
    }
  } catch (error) {
    console.error("Unexpected error in insertAbsentese:", error);
    return { error: "An unexpected error occurred" };
  }
};

const insertFees = async (fees) => {
  const { feesData, admNo } = fees;

  if (!feesData || !admNo) {
    console.error("Both feesData and admNo are required:", fees);
    return { error: "Both feesData and admNo are required" };
  }

  try {
    console.log(`Fetching existing fees data for admNo: ${admNo}`);

    const { data: existingData, error: fetchError } = await supabase
      .from("fees")
      .select("feesData")
      .eq("admNo", admNo);

    if (fetchError) {
      console.error("Error fetching fees data:", fetchError);
      return { error: "Failed to fetch fees data" };
    }

    if (existingData && existingData.length > 0) {
      const existingfeesData = existingData[0].feesData;
      console.log("Existing fees data:", existingfeesData);

      const updatedfeesData = Array.from(
        new Set([...existingfeesData.split(","), feesData])
      ).join(",");
      console.log("Updated fees data:", updatedfeesData);

      const { error: updateError } = await supabase
        .from("fees")
        .update({ feesData: updatedfeesData })
        .eq("admNo", admNo);

      if (updateError) {
        console.error("Error updating fees data:", updateError);
        return { error: "Failed to update fees data" };
      }

      return { status: "success", data: { admNo, feesData: updatedfeesData } };
    } else {
      console.log("Inserting new fees data:", fees);

      const { data, error: insertError } = await supabase
        .from("fees")
        .insert([{ feesData, admNo }])
        .select();

      if (insertError) {
        console.error("Error inserting fees data:", insertError);
        return { error: "Failed to insert fees data" };
      }

      return { status: "success", data: data[0] };
    }
  } catch (error) {
    console.error("Unexpected error in insertFees:", error);
    return { error: "An unexpected error occurred" };
  }
};



async function getStudentData(req, res) {
  const { className, div } = req.query;

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("className", className)
      .eq("div", div);

    if (error) {
      console.error("Error fetching studentData:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No users found for the given class and division" });
    }
    res.json({ status: "success", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getPaidStudentsThisMonth(req, res) {
  const { className, div } = req.query;

  try {
    const { data, error } = await supabase
      .from("fees")
      .select()
      .eq("className", className)
      .eq("div", div);

    if (error) {
      console.error("Error fetching PaidStudentsThisMonth:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No users found for the given class and division" });
    }
    res.json({ status: "success", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

module.exports = { insertNotifications, getStudentData, insertAbsentese, insertFees, getPaidStudentsThisMonth };
