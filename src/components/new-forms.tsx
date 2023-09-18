import CompanyForm from "./company-form"
import ConsoleForm from "./console-form"
import GameForm from "./game-form"
import GenreForm from "./genre-form"
import PublisherForm from "./publisher-form"

export default function NewForms({ currentForm }) {
  if (currentForm == 0) {
    return <GameForm />
  } else if (currentForm == 1) {
    return <ConsoleForm />
  } else if (currentForm == 2) {
    return <CompanyForm />
  } else if (currentForm == 3) {
    return <PublisherForm />
  } else if (currentForm == 4) {
    return <GenreForm />
  }
}
