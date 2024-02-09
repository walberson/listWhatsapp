import {
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { CreateTaksModal } from "./components/CreateTaskModal";
import { EditTaskModal } from "./components/EditTaskModal";

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

function App() {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  return (
    <>
      <Flex flex="1" px="30" direction="column">
        <Stack spacing="10">
          <Heading>Todo-list online</Heading>
          <Stack>
            <Button onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                setTasks(storedTasks);
              }
            } >Todas</Button>
            <Button
            onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const newTasks = storedTasks.filter((task: Task) => task.done);
                setTasks(newTasks);
            }}
            >Concluída</Button>
            <Button
            onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const newTasks = storedTasks.filter((task: Task) => !task.done);
                setTasks(newTasks);}
            }
            >Em andamento</Button>
          </Stack>
          <List spacing={3}>
            {tasks.map((todo) => (
              <ListItem key={todo.id}>
                <ListIcon
                  as={todo.done ? FaCircleCheck : FaCircleExclamation}
                  color={todo.done ? "green.500" : "yellow.500"}
                />
                {todo.text}
                <Button
                  onClick={() => {
                    const newTasks = tasks.map((task) => {
                      if (task.id === todo.id) {
                        task.done = !task.done;
                      }
                      return task;
                    });
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  {todo.done ? "Desfazer" : "Fazer"}
                </Button>
                <Button
                  onClick={() => {
                    const newTasks = tasks.filter(
                      (task) => task.id !== todo.id
                    );
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    setSelectedTask(todo);
                    onOpenEditModal();
                  }}
                >
                  Editar
                </Button>
                {isOpenEditModal && (
                  <EditTaskModal
                    key={todo.id}
                    isOpen={isOpenEditModal}
                    onClose={onCloseEditModal}
                    onOpen={onOpenEditModal}
                    setTasks={setTasks}
                    selectedTask={selectedTask as Task}
                  />
                )}
              </ListItem>
            ))}
          </List>
          <Box>
            <Button onClick={onOpenCreateModal}>Adicionar tarefa</Button>
          </Box>
        </Stack>
      </Flex>
      <CreateTaksModal
        setTasks={setTasks}
        isOpen={isOpenCreateModal}
        onOpen={onOpenCreateModal}
        onClose={onCloseCreateModal}
      />
    </>
  );
}

export default App;
