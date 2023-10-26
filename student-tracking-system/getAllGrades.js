const grades=[];

const getAllGrades = (userid) =>{
    const userData = grades.filter(g => g.userid === userid);
    return userData;
}

const addGrades = (courseName, subjectCode, gpa, semester, status, credits, userid) => {
    grades.push({subId: newSubId(),userid, courseName, subjectCode, gpa, semester, status, credits});
    return 'Grades Added';
}

const editGrade = (courseName, subjectCode, gpa, semester, status, credits, editJobId) =>
{
        objIndex = grades.findIndex((obj => obj.subId == editJobId));
        grades[objIndex]={
            ...grades[objIndex],
            courseName: courseName || grades[objIndex].courseName,
            subjectCode: subjectCode || grades[objIndex].subjectCode,
            gpa: gpa || grades[objIndex].gpa,
            semester: semester || grades[objIndex].semester,
            status: status || grades[objIndex].status,  
            credits: credits || grades[objIndex].credits,  
            subId:newSubId(),}
}

const deleteGrade = (subId) => {
    objIndex = grades.findIndex((obj => obj.subId === subId));
    grades.splice(objIndex,1);
}

function newSubId(){
    let subId=1
    if(!grades.find(j => j.subId))
    {
        subId=1;
    }
    else
    {
        subId=Math.max(...grades.map(grade => grade.subId))+1;
    }

    return subId;
}

module.exports = {
    getAllGrades,
    addGrades,
    editGrade,
    deleteGrade,
};

