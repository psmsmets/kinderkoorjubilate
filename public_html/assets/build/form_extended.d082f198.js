(window.webpackJsonp=window.webpackJsonp||[]).push([["form_extended"],{mT8G:function(e,t,s){(function(e){function t(){e("#submit").prop("disabled",!1),e("#submit").html('<i class="fas fa-paper-plane"></i> Verzend')}!function(){"use strict";window.addEventListener("load",(function(){e(".needs-validation").append('<div class="form-group row pt-3"><div class="col-sm-10"><button type="submit" class="btn btn-secondary" id="submit" value="Send"></button><small id="submitHelp" class="form-text text-muted d-none">Gelieve de pagina <strong>niet</strong> te herladen tijdens het verzenden.</small></div></div>'),t(),e("label[for$='_form_terms']").html('Ik heb het <a href="/privacy">privacybeleid</a> gelezen en ga hiermee akkoord.'),e("select").addClass("custom-select");var s=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(s,(function(s){s.addEventListener("submit",(function(n){e("#submit").prop("disabled","disabled"),e("#submit").html('<i class="fas fa-sync-alt"></i> Verwerken'),e("#submitHelp").removeClass("d-none"),!1===s.checkValidity()&&(n.preventDefault(),n.stopPropagation(),t()),s.classList.add("was-validated")}),!1)}))}),!1)}()}).call(this,s("EVdn"))}},[["mT8G","runtime",0]]]);