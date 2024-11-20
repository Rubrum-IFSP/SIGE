import "./Atividades.css";

interface Props {
  subjectId: string;
  titulo: any;
  descricao: any;
  role: string;
}

export default function Atividade({
  titulo,
  descricao,
  role,
  subjectId,
}: Props) {
  const handleDelete = async (e: any) => {
    e.preventDefault();

    const response = await deleteLesson(titulo, subjectId, descricao);
    console.log(titulo);
    console.log(subjectId);
    console.log(descricao);

    console.log(response);
    window.location.reload();
  };
  const deleteLesson = async (
    title: string,
    subjectId: string,
    descricao: string
  ): Promise<void> => {
    const data = {
      subjectId: subjectId,

      title: title,

      descricao: descricao,
    };

    try {
      const response = await fetch(
        "http://localhost:8081" + `/lession/delete`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data), // Sending the data in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }

      const result = await response.json();

      console.log("Lesson deleted successfully:", result);

      // Optionally, you can update your state here to remove the lesson from the UI
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  if (role === "PROVOST" || role === "PROFESSOR" || role === "ADMIN") {
    return (
      <div className="atividade">
        <span className="atividadeTitulo">{titulo}</span>
        <span className="atividadeDescricao">{descricao}</span>
        <button onClick={handleDelete}>Excluir</button>
      </div>
    );
  } else {
    return (
      <div className="atividade">
        <span className="atividadeTitulo">{titulo}</span>
        <span className="atividadeDescricao">{descricao}</span>
      </div>
    );
  }
}
