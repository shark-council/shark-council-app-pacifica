import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

// TODO: Fill in descriptions
export function IndexTechnologiesSection(props: { className?: ClassValue }) {
  return (
    <section className={cn(props.className)}>
      <p className="font-bold text-center">Technologies</p>
      <p className="text-muted-foreground text-center">
        The engine behind the experience
      </p>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Avatar className="size-12">
              <AvatarImage src="/images/technologies/pacifica-dark.png" />
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Pacifica API</ItemTitle>
            <ItemDescription className="line-clamp-3">...</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Avatar className="size-12">
              <AvatarImage src="/images/technologies/pacifica-light.png" />
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Pacifica Builder Codes</ItemTitle>
            <ItemDescription className="line-clamp-3">...</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Avatar className="size-12">
              <AvatarImage src="/images/technologies/erc-8004.png" />
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>ERC-8004 & 8004scan</ItemTitle>
            <ItemDescription className="line-clamp-3">...</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Avatar className="size-12">
              <AvatarImage src="/images/technologies/langchain.png" />
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>LangChain & OpenRouter</ItemTitle>
            <ItemDescription className="line-clamp-3">...</ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </section>
  );
}
