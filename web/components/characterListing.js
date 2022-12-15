import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import client from "../pages/helpers/sanityClient";
import ExpIcon from "./icons/expIcon";
import CoinsIcon from "./icons/coinsIcon";
import ArrowIcon from "./icons/arrowIcon";

const myLoader = ({ src, width, quality }) => {
    return `${src}`;
};

const builder = imageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

const CharacterListing = ({ characters, currentUser }) => {
    console.log(characters);
    const iconWidth = 200;
    const iconHeight = 200;
    return (
        <ul className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 font-karla">
            {characters.map((character) => (
                <li key={character.name}>
                    <Link
                        href={`/character/${character._id}?user=${currentUser}`}
                        className="flex flex-nowrap w-full group border-2 border-black rounded-lg p-2"
                    >
                        <figure className="w-[100px] mr-4">
                            <Image
                                src={urlFor(character.relatedCharacterType.icon)
                                    .width(iconWidth)
                                    .height(iconHeight)
                                    .url()}
                                width={iconWidth}
                                height={iconHeight}
                                alt={`${character.name}'s logo`}
                                loader={myLoader}
                            />
                        </figure>
                        <div className="flex-grow pr-2">
                            <h3 className="border-b-[1px] border-black w-max">
                                {character.name}
                            </h3>
                            <span className="">
                                {character.relatedCharacterType.name}
                            </span>
                            <div className="text-md flex mt-2">
                                <span className="flex items-center mr-2">
                                    <ExpIcon classNames={"w-5 h-5 mr-1"} />
                                    {character.xp}
                                </span>
                                <span className="flex items-center">
                                    <CoinsIcon classNames={"w-5 h-5 mr-1"} />
                                    {character.gold}
                                </span>
                                <span className="flex ml-auto items-center">
                                    {character.relatedPlayer.name ==
                                        currentUser && `Edit character`}
                                    {character.relatedPlayer.name !=
                                        currentUser && `Read more`}
                                    <ArrowIcon classNames={"ml-1 h-5 w-5"} />
                                </span>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default CharacterListing;
