import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sanityClient } from "~/sanity.server";

export const loader = async () => {
  console.log("Loader function called");
  try {
    const projects = await sanityClient.fetch(`*[_type == "project"] { _id, title, description }`);
    console.log("Fetched projects:", projects);
    return json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return json({ projects: [], error: String(error) });
  }
};

export default function Index() {
  console.log("Index component rendered");
  const { projects, error } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>My Portfolio</h1>
      {error && <p>Error: {error}</p>}
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul>
          {projects.map((project: any) => (
            <li key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}