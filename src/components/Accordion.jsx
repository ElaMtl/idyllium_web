import {
    Accordion as BaseAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function Accordion({ data = [] }) {
    return (
        <BaseAccordion type="single" collapsible className="w-full relative">
            {data.map((item, i) => {
                return (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                            {item.description?.length > 0 ? (
                                item.description.length === 1 ? (
                                    <p>{item.description[0]}</p>
                                ) : (
                                    <ul className="list-disc list-inside text-xl text-muted-foreground">
                                        {item.description.map((desc, j) => (
                                            <li key={j}>{desc}</li>
                                        ))}
                                    </ul>
                                )
                            ) : (
                                <p></p>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </BaseAccordion>
    );
}
