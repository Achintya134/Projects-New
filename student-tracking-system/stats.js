const showStats = async (req, res) => {
    let stats = await Job.aggregate([
      //match is used to filter all the jobs created by a certain user
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      //grouping them on based on job status and count of each group
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    let stats = jobs.filter(j => j.userid === userid);
    let group = {};
    stats.map((s) => {
        if(!group[s.status]){
            group[s.status]=1;
        }
        else{
            group[s.status]= group[s.status]+1
        }
    });

  
    //using reduce which returns an object of diff status title by iterrating over the array
    stats = stats.reduce((acc, curr) => {
      const { title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
  
    //for a new user when there are no jobs added yet - setting up default stats object
    const defaultStats = {
      Awaiting: stats["Awaiting Response"] || 0,
      Interview: stats["Interview Scheduled"] || 0,
      Rejected: stats.Rejected || 0,
      Accepted: stats.Accepted || 0,
    };
  
    //default value for stats chart
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
  
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  };