"use client";

import { useState } from "react";
import type { GravityField, GravityForm } from "@/app/lib/wp/types";

/**
 * Renders a Gravity Forms schema dynamically.
 *
 * Emits the same DOM Gravity Forms produces server-side — `.gform_wrapper`,
 * `.gform_fields`, `.gfield.gf-col-N`, `.gfield_label`, `.ginput_container`,
 * `.gform_footer`, `.gform_button` — so every rule in styles/pages/contact.scss
 * applies unchanged. Posts to /api/contact, which forwards to GF REST when
 * GF_BASE_URL / GF_FORM_ID / GF_REST_USER / GF_REST_PASS are set.
 */

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "success" | "error";

const isVisibleField = (f: GravityField) =>
  f.type !== "honeypot" && f.type !== "hidden" && f.type !== "section";

/** Map GF `cssClass` (e.g., `gf-col-6 gf-col-12-md`) onto the wrapper <li>. */
function fieldClass(f: GravityField, hasError: boolean) {
  const base = [
    "gfield",
    `gfield--type-${f.type}`,
    f.cssClass ?? "",
    f.isRequired ? "gfield_contains_required" : "",
    "field_sublabel_below",
    "field_description_below",
    "field_validation_below",
    "gfield_visibility_visible",
    hasError ? "gfield_error" : "",
  ];
  if (f.type === "honeypot") base.push("gform_validation_container");
  return base.filter(Boolean).join(" ");
}

export default function ContactForm({ form }: { form: GravityForm }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [topError, setTopError] = useState<string>("");

  function validate(fd: FormData): Errors {
    const errs: Errors = {};
    for (const f of form.fields) {
      if (!f.isRequired || !isVisibleField(f)) continue;
      const v = String(fd.get(`input_${f.id}`) ?? "").trim();
      if (!v) {
        errs[String(f.id)] = "This field is required.";
        continue;
      }
      if (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
        errs[String(f.id)] = "Please enter a valid email address.";
      }
    }
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const errs = validate(fd);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTopError("There was a problem with your submission. Please review the fields below.");
      setStatus("idle");
      return;
    }
    setErrors({});
    setTopError("");
    setStatus("sending");

    // Forward everything to /api/contact under a `form_id` + `input_N` shape
    // so the server route can pass straight through to GF REST.
    const payload = new FormData();
    payload.set("form_id", String(form.id));
    for (const f of form.fields) {
      const name = `input_${f.id}`;
      payload.set(name, String(fd.get(name) ?? ""));
    }

    try {
      const res = await fetch("/api/contact", { method: "POST", body: payload });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setTopError(err instanceof Error ? err.message : "Could not send your message. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="gform_confirmation_wrapper">
        <div className="gform_confirmation_message">
          Message sent. We&rsquo;ll be in touch shortly.
        </div>
      </div>
    );
  }

  const wrapperId = `gform_wrapper_${form.id}`;
  const formId    = `gform_${form.id}`;
  const fid       = (n: number) => `input_${form.id}_${n}`;

  return (
    <div className={`gform_wrapper gform_legacy_markup_wrapper ${form.cssClass ?? ""}`} id={wrapperId} data-form-theme="legacy">
      {topError && (
        <div className="gform_validation_errors" role="alert">
          <h2 className="gform_submission_error">{topError}</h2>
        </div>
      )}

      <form id={formId} method="post" encType="multipart/form-data" noValidate onSubmit={onSubmit}>
        <div className="gform-body gform_body">
          <ul id={`gform_fields_${form.id}`} className="gform_fields top_label form_sublabel_below description_below validation_below">
            {form.fields.map((f) => {
              const errorMsg = errors[String(f.id)];
              const inputId = fid(f.id);
              const inputName = `input_${f.id}`;
              const required = !!f.isRequired;
              const aria = {
                "aria-required": required ? "true" : undefined,
                "aria-invalid":  errorMsg ? "true" : "false",
              } as const;

              return (
                <li key={f.id} id={`field_${form.id}_${f.id}`} className={fieldClass(f, !!errorMsg)}>
                  {f.type !== "section" && f.type !== "html" && (
                    <label className="gfield_label gform-field-label" htmlFor={inputId}>
                      {f.label}
                      {required && (
                        <span className="gfield_required">
                          <span className="gfield_required gfield_required_asterisk">*</span>
                        </span>
                      )}
                    </label>
                  )}

                  {f.type === "text" && (
                    <div className="ginput_container ginput_container_text">
                      <input type="text" name={inputName} id={inputId} className="medium" placeholder={f.placeholder} defaultValue={f.defaultValue} {...aria} />
                    </div>
                  )}

                  {f.type === "email" && (
                    <div className="ginput_container ginput_container_email">
                      <input type="email" name={inputName} id={inputId} className="medium" placeholder={f.placeholder} autoComplete="email" {...aria} />
                    </div>
                  )}

                  {f.type === "phone" && (
                    <div className="ginput_container ginput_container_phone">
                      <input type="tel" name={inputName} id={inputId} className="medium" placeholder={f.placeholder} autoComplete="tel" {...aria} />
                    </div>
                  )}

                  {f.type === "url" && (
                    <div className="ginput_container ginput_container_url">
                      <input type="url" name={inputName} id={inputId} className="medium" placeholder={f.placeholder} {...aria} />
                    </div>
                  )}

                  {f.type === "number" && (
                    <div className="ginput_container ginput_container_number">
                      <input type="number" name={inputName} id={inputId} className="medium" placeholder={f.placeholder} {...aria} />
                    </div>
                  )}

                  {f.type === "textarea" && (
                    <div className="ginput_container ginput_container_textarea">
                      <textarea name={inputName} id={inputId} className="textarea medium" rows={6} placeholder={f.placeholder} defaultValue={f.defaultValue} {...aria} />
                    </div>
                  )}

                  {f.type === "select" && (
                    <div className="ginput_container ginput_container_select">
                      <select name={inputName} id={inputId} className="medium gfield_select" defaultValue={f.defaultValue ?? ""} {...aria}>
                        {f.placeholder && (
                          <option value="" className="gf_placeholder">{f.placeholder}</option>
                        )}
                        {(f.choices ?? []).map((c, i) => (
                          <option key={`${c.value}-${i}`} value={c.value}>{c.text}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {f.type === "radio" && (
                    <div className="ginput_container ginput_container_radio">
                      <ul className="gfield_radio">
                        {(f.choices ?? []).map((c, i) => (
                          <li key={`${c.value}-${i}`}>
                            <input type="radio" name={inputName} id={`${inputId}_${i}`} value={c.value} defaultChecked={c.isSelected} />
                            <label htmlFor={`${inputId}_${i}`}>{c.text}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {f.type === "checkbox" && (
                    <div className="ginput_container ginput_container_checkbox">
                      <ul className="gfield_checkbox">
                        {(f.choices ?? []).map((c, i) => (
                          <li key={`${c.value}-${i}`}>
                            <input type="checkbox" name={`${inputName}_${i + 1}`} id={`${inputId}_${i + 1}`} value={c.value} defaultChecked={c.isSelected} />
                            <label htmlFor={`${inputId}_${i + 1}`}>{c.text}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {f.type === "honeypot" && (
                    <div className="ginput_container">
                      <input type="text" name={inputName} id={inputId} autoComplete="new-password" tabIndex={-1} defaultValue="" />
                    </div>
                  )}

                  {f.type === "hidden" && (
                    <input type="hidden" name={inputName} id={inputId} defaultValue={f.defaultValue ?? ""} />
                  )}

                  {f.type === "html" && (
                    <div className="gfield_html" dangerouslySetInnerHTML={{ __html: f.description ?? "" }} />
                  )}

                  {f.description && f.type !== "html" && (
                    <div className="gfield_description" id={`gfield_description_${form.id}_${f.id}`}>{f.description}</div>
                  )}

                  {errorMsg && (
                    <div className="gfield_validation_message">{errorMsg}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="gform-footer gform_footer top_label">
          <button
            type="submit"
            id={`gform_submit_button_${form.id}`}
            className="gform_button btn btn-dark"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : form.button}{" "}
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <input type="hidden" name="gform_submit" value={String(form.id)} />
      </form>
    </div>
  );
}
