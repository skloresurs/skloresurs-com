import { m } from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import ky from "ky";
import { AtSign, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const schema = z.object({
  name: z.string({ required_error: "required" }).min(1, "required"),
  email: z.string({ required_error: "required" }).email("invalidEmail"),
  phone: z.optional(z.string({ required_error: "required" })),
  message: z.string({ required_error: "required" }).min(1, "required"),
});

type Schema = z.infer<typeof schema>;

function getError(err?: string) {
  switch (err) {
    case "required":
      return m.home_contact_us_errors_required();
    case "invalidEmail":
      return m.home_contact_us_errors_invalid_email();
    default:
      return "";
  }
}

type State = "idle" | "loading" | "success" | "error";

interface IProps {
  locale?: string;
}

export default function ContactUsForm({ locale }: IProps) {
  const [state, setState] = useState<State>("idle");
  const { executeGoogleReCaptcha } = useGoogleReCaptcha(
    import.meta.env.PUBLIC_G_RECAPTCHA_SITE_KEY,
    {
      hide: true,
      language: locale,
    },
  );
  const button = useMemo(() => {
    switch (state) {
      case "loading":
        return {
          label: m.home_contact_us_button_loading(),
          className: "bg-primary-700",
        };
      case "success":
        return {
          label: m.home_contact_us_button_success(),
          className: "bg-green-700",
        };
      case "error":
        return {
          label: m.home_contact_us_button_error(),
          className: "bg-red-700",
        };
      default:
        return {
          label: m.home_contact_us_button(),
          className: "bg-primary",
        };
    }
  }, [state]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const setErrorState = () => {
    setState("error");
    setTimeout(() => setState("idle"), 5000);
  };

  const submit = async (value: Schema) => {
    if (state !== "idle") return;
    setState("loading");
    const captcha = await executeGoogleReCaptcha("submit_contact_us").catch(
      () => null,
    );
    if (!captcha) return setErrorState();

    const res = await ky
      .post("/api/feedback", {
        json: { ...value, captcha },
      })
      .catch(() => null);
    if (!res?.ok) return setErrorState();
    setState("success");
    reset();
    setTimeout(() => setState("idle"), 10000);
  };

  return (
    <form
      className="flex w-full max-w-[500px] flex-col gap-4"
      onSubmit={handleSubmit(v => submit(v))}
    >
      <h2 className="uppercase" data-aos="fade-right">
        {m.home_contact_us_title_1()}
        <span className="text-primary-100">{m.home_contact_us_title_2()}</span>
      </h2>
      <div className="flex flex-col gap-1">
        <input
          {...register("name")}
          className="block w-full rounded-lg border-background-700 bg-background-600 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 "
          placeholder="Ваше ім'я*"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        />
        {errors.name && (
          <p
            className="text-red-600 text-sm"
            id="hs-validation-name-error-helper"
          >
            {getError(errors.name.message)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("email")}
          className="block w-full rounded-lg border-background-700 bg-background-600 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 "
          placeholder="Ваш email*"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        />
        {errors.email && (
          <p
            className="text-red-600 text-sm"
            id="hs-validation-name-error-helper"
          >
            {getError(errors.email.message)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("phone")}
          className="block w-full rounded-lg border-background-700 bg-background-600 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 "
          placeholder="Ваше номер телефону"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        />
        {errors.phone && (
          <p
            className="text-red-600 text-sm"
            id="hs-validation-name-error-helper"
          >
            {getError(errors.phone.message)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <textarea
          {...register("message")}
          className="block w-full rounded-lg border-background-700 bg-background-600 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50"
          rows={3}
          placeholder="Ваше повідомлення*"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        />
        {errors.message && (
          <p
            className="text-red-600 text-sm"
            id="hs-validation-name-error-helper"
          >
            {getError(errors.message.message)}
          </p>
        )}
      </div>
      <button
        disabled={state !== "idle"}
        type="submit"
        className={twMerge(
          "inline-flex w-min items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 font-medium text-sm text-white duration-300 focus:outline-none focus:enabled:bg-primary-700 hover:enabled:bg-primary-700 disabled:cursor-not-allowed",
          button.className,
        )}
      >
        <span className="text-nowrap">{button.label}</span>
      </button>
      <p className="text-muted text-sm">
        <span>This site is protected by reCAPTCHA and the Google</span>
        <a href="https://policies.google.com/privacy"> Privacy Policy </a>
        and
        <a href="https://policies.google.com/terms"> Terms of Service </a>
        apply.
      </p>
      <div
        className="flex flex-col justify-between gap-2 lg:flex-row"
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-delay="300"
      >
        <div className="flex flex-row items-center gap-1">
          <Phone width={36} height={36} />
          <div className="ml-1 flex flex-col">
            <p className="font-medium">{m.home_contact_us_telephone()}</p>
            <a
              title="Telephone"
              href="tel:+38 (044) 355-05-99"
              className="m-0 h-min text-nowrap p-0 text-primary-100"
            >
              +38 (044) 355-05-99
            </a>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <AtSign width={36} height={36} />
          <div className="ml-1 flex flex-col">
            <p className="font-medium">E-mail</p>
            <a
              title="E-mail"
              href="mailto:office@skloresurs.com"
              className="m-0 h-min text-nowrap p-0 text-primary-100"
            >
              office@skloresurs.com
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
