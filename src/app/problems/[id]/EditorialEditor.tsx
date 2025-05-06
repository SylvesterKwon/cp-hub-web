"use client";

export default function EditorialEditor(props: { problemId: string }) {
  const problemId = props.problemId;

  return (
    <div>
      <h1>Editorial Editor</h1>
      <p>Problem ID: {problemId}</p>
      {/* Add your editorial editor component here */}
    </div>
    // <Card variant="outlined">
    //   <CardHeader title={<Typography variant="h5">My editorial</Typography>} />
    //   <CardContent>
    //     {isLoading === false ? (
    //       editorial ? (
    //         <MarkdownText content={editorial.content} />
    //       ) : (
    //         <div>no</div>
    //       )
    //     ) : (
    //       <>
    //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    //         <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    //       </>
    //     )}
    //   </CardContent>
    // </Card>
  );
}
